const { DiscordAPIError } = require("discord.js")
const Discord = require(`discord.js`);
const pref = require('../config/config.json');
const { execute } = require("./createroletable");

module.exports = {
    name: 'removeroletable',
    description: "Removes the role table.",
    usage: `\`${pref.prefix}removeroletable\``,
    cooldown: 5,
    async execute(client, message, args, users, ranks, Canvas, lvls) {
        const target = message.author;
        const member = message.guild.member(target);
        if(member.hasPermission("ADMINISTRATOR")) {
            let data = await ranks.findOne({ guild_id: message.guild.id, rank_id: 100 });
            let datacheck = data.role_id;
            if(datacheck) {
                var ok = 1;
                for(var j = 100; j >= 1; j = j -1) {
                    var query = { guild_id: message.guild.id, rank_id: j}
                    try {
                        const r = await ranks.findOne(query);
                        let delrole = r.role_id;
                        if(delrole!='0') {
                            message.guild.roles.fetch(delrole).then(async role => {
                                await role.delete();
                            })
                        }
                        await r.updateOne({ role_id: `0`});
                        await r.save();
                    } catch (e) {
                        const elembed = new Discord.MessageEmbed()
                        .setColor('#dd4545')
                        .setDescription(`**Caught an error.**`)
                        message.channel.send(elembed);
                        ok = 0;
                        break;
                    } 
                } 
                if(ok==1) {
                    const el2embed = new Discord.MessageEmbed()
                        .setColor('#ad26d1')
                        .setDescription(`**Removed role table successfully.**`)
                    message.channel.send(el2embed);
                } 
            } else {
                const elembed = new Discord.MessageEmbed()
                    .setColor('#dd4545')
                    .setDescription(`**There are no linked roles.**`)
                message.channel.send(elembed);
            }
        }
    }
}