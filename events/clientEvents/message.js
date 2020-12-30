const { Collection, MessageEmbed } = require(`discord.js`);
const { prefix } = require('../../config/config.json');

const xpcooldown = new Collection();
const commandcooldown = new Collection();

const ranks = require("../../data/ranks");

const memberaddXP = require("../../functions/XP/memberaddXP");
const getRandomXP = require("../../functions/XP/getRandomXP");
const addXP = require("../../functions/XP/addXP");

module.exports = {
    async run(client, message) {
        if(message.author.bot || message.channel.type == "dm") {
            return;
        }
        if(!message.content.startsWith(prefix)) {
            if(xpcooldown.has(message.author.id)) {
                return;
            }
            addXP(message.author.id, getRandomXP(3, 7), message.author.tag, 0, 0)
            memberaddXP(message.author.id, getRandomXP(10, 25), message.author.tag, 0, 0, message.guild.id).then( async val => {
                let r = await ranks.findOne({ guild_id: message.guild.id, rank_id: val[1] });
                if(r!=undefined && val[1] > 0) {
                    try {
                        await message.member.roles.add(r.role_id);
                    } catch (e) {
                        await ranks.deleteOne({ guild_id: message.guild.id, role_id: `${r.role_id}`})
                    }
                }
                if(val[0] == 1 && val[1] > 0) {
                    try {
                        message.channel.send(`<@${message.author.id}> has advanced to level ${val[1]}`);
                    } catch (e) {}
                }
            })
            xpcooldown.set(message.author.id);
            setTimeout(() => xpcooldown.delete(message.author.id), 30000)
        }
        if(message.content.startsWith(prefix)) {
            
            const args = message.content.slice(prefix.length).split(/ +/);
            const commandName = args.shift().toLowerCase();
            const cmd = client.commands.get(commandName)
            if(cmd==undefined) return;
            const command = cmd.cmd;
            if (!commandcooldown.has(command.name)) {
                commandcooldown.set(command.name, new Collection());
            }

            const now = Date.now();
            const timestamps = commandcooldown.get(command.name);
            const cooldownAmount = (command.cooldown || 3) * 1000;

            if(timestamps.has(message.author.id)) {
                const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

                if(now < expirationTime) {
                    const timeLeft = (expirationTime - now) / 1000;
                    const timeembed = new MessageEmbed()
                        .setColor('#dd4545')
                        .setDescription(`**wait ${timeLeft.toFixed(1)} more second(s)**`)
                    return message.channel.send(timeembed).then(async msg => { await msg.delete({timeout: 1000}) })
                }
            }

            timestamps.set(message.author.id, now);
            setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
            await command.execute(client, message, args);
        }
    }
}