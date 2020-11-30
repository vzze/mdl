const { client, clientcmds } = require("../index");
const Discord = require(`discord.js`);
const lvls = require('../config/levels.json');
const config = require('../config/config.json');
const prefix = config.prefix;
const xpcooldown = new Discord.Collection;
const commandcooldown = new Discord.Collection;
const xp = new Discord.Collection;
const Canvas = require('canvas');

const ranks = require('../data/ranks');
const users = require('../data/users');

let levelupchecker = 0;
let newlevel = 0;

async function addXP(id, amount, name) {
    var query = { user_id: id }
    try {   
            const u = await users.findOne(query);
            let newxp = u.xp + amount;
            await u.updateOne({ xp: newxp });
            await u.updateOne({ user_name: `${name}` });
            newlevel = u.level;
            if(newxp >= lvls.lvl[u.level] && u.level <= 99 && newxp >= 100) {
                levelupchecker = 1;
                newlevel = u.level + 1;
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
            xp.set(message.author.id, await newlevel);
            let r = await ranks.findOne({ guild_id: message.guild.id, rank_id: xp.get(message.author.id) });
            let rolecheck = 0;
            if(r) {
                rolecheck = r.role_id;
            }
            if(rolecheck!='0' && xp.get(message.author.id) > 0) {
                await message.member.roles.add(rolecheck);
            }
            if(await levelupchecker == 1 && xp.get(message.author.id) > 0) {
                message.channel.send(`<@${message.author.id}> has advanced to level ${xp.get(message.author.id)}`);
            }
        });
        xpcooldown.set(message.author.id);
        setTimeout(() => xpcooldown.delete(message.author.id), 30000)
    }
    if(message.content.startsWith(prefix)) {
            const args = message.content.slice(prefix.length).split(/ +/);
            const commandName = args.shift().toLowerCase();
            const command = clientcmds.get(commandName)
            if(command==undefined) return;

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
            await command.execute(client, message, args, users, ranks, Canvas, lvls);

    }

});