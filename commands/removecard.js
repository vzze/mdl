const { DiscordAPIError } = require("discord.js")
const Discord = require(`discord.js`);
const pref = require('../config/config.json')
const users = require('../data/users');

module.exports = {
    name: 'removecard',
    description: "Removes your custom card and reverts to the original one.",
    usage: `\`${pref.prefix}removecard\``,
    cooldown: 3,
    async execute(client, message, args) {
        const u = await users.findOne({ user_id: message.author.id });
        if(u==undefined) {
            const newU = new users({
                user_id: message.author.id, 
                xp: 0, 
                level: 0, 
                user_name: `${message.author.tag}`,
                rankcardlink: 0,
                rankavatar: 1
            });
            newU.save();
            u = newU;
            setTimeout(() => {}, 3000);
        }
        if(u.rankcardlink!='0') {
            var ok = 1;
            try {
            await u.updateOne({ rankcardlink: 0 });
            await u.save();
            } catch (e) {
                ok = 0;
                const l2embed = new Discord.MessageEmbed()
                    .setColor('#dd4545')
                    .setDescription(`**Caught an error.**`)
                message.channel.send(l2embed);
            }
            if(ok==1) {
                const l3embed = new Discord.MessageEmbed()
                    .setColor('#ad26d1')
                    .setDescription(`**Succesfully removed your rank card.**`);
                message.channel.send(l3embed);
            }
        } else {
            const l3embed = new Discord.MessageEmbed()
                .setColor('#dd4545')
                .setDescription(`**You don\'t have a rank card in the first place.**`)
            message.channel.send(l3embed);
        }
    }
}