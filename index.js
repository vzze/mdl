const Discord = require(`discord.js`);
const client = new Discord.Client();
const config = require('./config/config.json');
const prefix = config.prefix;
const lvls = require('./config/levels.json');
const fs = require('fs');
const mongoose = require('mongoose');
const useruser = config.cluseruser;
const pass = config.clusterpass;
const xpcooldown = new Discord.Collection;
const commandcooldown = new Discord.Collection;
const Canvas = require('canvas');

let levelupchecker = 0;

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
 
    client.commands.set(command.name, command);
}

mongoose.connect(`mongodb+srv://${useruser}:${pass}@cluster.8lzpu.mongodb.net/database?retryWrites=true&w=majority`, 
    {useNewUrlParser: true, useUnifiedTopology: true, autoIndex: false}  
);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function() {
  console.log(`Connected to MongoDB as ${useruser}`);
});

const ranks = require('./data/ranks');
const users = require('./data/users');

async function getXP(id) {
    var query = { user_id: id }
    const u = await users.findOne(query);
    try {
        let xp = u.xp;
        return xp;
    } catch (e) {
        return 0;
    }
}


async function getLEVEL(id) {
    var query = { user_id: id }
        const u = await users.findOne(query);
        try {
            let level = u.level;
            return level;
        } catch (e) {
            return 0;
        }
}

async function addXP(id, amount, name) {
    var query = { user_id: id }
    try {
            const u = await users.findOne(query);
            let newxp = u.xp + amount;
            await u.updateOne({ xp: newxp });
            await u.updateOne({ user_name: `${name}` });
            if(newxp >= lvls.lvl[u.level] && u.level <= 99 && newxp >= 100) {
                levelupchecker = 1;
                let newlevel = u.level + 1;
                await u.updateOne({ level: newlevel});
                await u.save();
            } else {
                await u.save();
            }
    } catch (e) {
        const newU = new users({
            user_id: id, 
            xp: `${amount}`, 
            level: 0, 
            user_name: `${name}`,
            rankcardlink: 0,
            rankavatar: 1
        });
        newU.save();
    } 
    
}

function getRandomXP(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random()*(max-min+1)+min);
}

client.once('ready', async () => {
    console.log(`Logged in as ${client.user.tag}`);
    const activities = [
        `${client.guilds.cache.size} guilds`,
        `.mhelp`
    ];
    let i = 0;
    setInterval(() => {
        client.user.setActivity(`${activities[i++ % activities.length]}`, {
            type: "WATCHING",
          });
    }, 30000);

});

client.on('guildCreate', async guild => {
    for(var j = 100; j >= 1; j = j - 1) {
        const newGuild = new ranks({ guild_id: `${guild.id}`, rank_id: j, role_id: '0'});
        newGuild.save();
    }
});

client.on('guildDelete', async guild => {
    await ranks.deleteMany({guild_id: `${guild.id}`});
});

client.on('message', async message => {
    if(message.author.bot || message.channel.type == "dm") {
        return;
    }

    if(!message.content.startsWith(prefix)) {
        if(xpcooldown.has(message.author.id)) {
            return;
        }
        levelupchecker = 0;
        addXP(message.author.id, getRandomXP(15, 25), message.author.tag).then(async () => {
            let levelchecker = await getLEVEL(message.author.id);
            if(await levelupchecker == 1 && levelchecker > 0) {
                const r = await ranks.findOne({ guild_id: message.guild.id, rank_id: levelchecker });
                const rolecheck = r.role_id;
                message.channel.send(`<@${message.author.id}> has advanced to level ${levelchecker}`);
                if(rolecheck!='0') {
                    await message.member.roles.add(rolecheck);
                }
            }
        });
        xpcooldown.set(message.author.id);
        setTimeout(() => xpcooldown.delete(message.author.id), 30000)
    }
    if(message.content.startsWith(prefix)) {
            const args = message.content.slice(prefix.length).split(/ +/);
            const commandName = args.shift().toLowerCase();
            const command = client.commands.get(commandName)
            if(command!=undefined) {
            if (!commandcooldown.has(command.name)) {
                commandcooldown.set(command.name, new Discord.Collection());
            }

            const now = Date.now();
            const timestamps = commandcooldown.get(command.name);
            const cooldownAmount = (command.cooldown || 3) * 1000;

            if(timestamps.has(message.author.id)) {
                const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

                if(now < expirationTime) {
                    const timeLeft = (expirationTime - now) / 1000;
                    const timeembed = new Discord.MessageEmbed()
                        .setColor('#dd4545')
                        .setDescription(`**wait ${timeLeft.toFixed(1)} more second(s)**`)
                    return message.channel.send(timeembed).then(async msg => { await msg.delete({timeout: 1000}) })
                }
            }

            timestamps.set(message.author.id, now);
            setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
        }
        try {
            await command.execute(client, message, args, users, ranks, Canvas, lvls);
        } catch (e) {

        }
    }

})

client.login(config.token);