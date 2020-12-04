const { client, clientcmds } = require("../index");
const Discord = require(`discord.js`);
const { prefix } = require('../config/config.json');
const xpcooldown = new Discord.Collection;
const commandcooldown = new Discord.Collection;
const ranks = require("../data/ranks");

const getRandomXP = require("../functions/getRandomXP");
const addXP = require("../functions/addXP");

client.on('message', async message => {
    if(message.author.bot || message.channel.type == "dm") {
        return;
    }
    if(!message.content.startsWith(prefix)) {
        if(xpcooldown.has(message.author.id)) {
            return;
        }
        addXP(message.author.id, getRandomXP(15, 25), message.author.tag, 0, 0).then( async val => {
            let r = await ranks.findOne({ guild_id: message.guild.id, rank_id: val[1] });
            let rolecheck = 0;
            if(r!=undefined) {
                rolecheck = r.role_id;
            }
            if(rolecheck!='0' && val[1] > 0) {
                try {
                    await message.member.roles.add(rolecheck);
                } catch (e) {
                    
                }
            }
            if(val[0] == 1 && val[1] > 0) {
                try {
                    message.channel.send(`<@${message.author.id}> has advanced to level ${val[1]}`);
                } catch (e) {
                    
                }
            }
        })
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
        await command.execute(client, message, args);
    }
});
