const { DiscordAPIError } = require("discord.js")
const Discord = require(`discord.js`);
const pref = require('../config/config.json');
const { execute } = require("./createroletable");

module.exports = {
    name: 'linkroletable',
    description: "Links the role table.",
    usage: `\`${pref.prefix}linkroletable\``,
    cooldown: 5,
    async execute(client, message, args, users, ranks, Canvas, lvls) {
        function levelRoleN(a) {
            var b = `Level ${a}`
            return b;
        }
        let data = await ranks.findOne({ guild_id: message.guild.id, rank_id: 100 });
        let datacheck = data.role_id;
        const target = message.author;
        const member = message.guild.member(target);
        if(member.hasPermission("ADMINISTRATOR")) {
            let rolecheck = await message.guild.roles.cache.find(r => r.name === levelRoleN(100));
            if(rolecheck) {
                if(datacheck=='0') {
                    var ok = 1;
                    for(var j = 100; j >= 1; j = j -1) {
                        var query = { guild_id: message.guild.id, rank_id: j}
                        try {
                            let roleadd  = await message.guild.roles.cache.find(r => r.name === levelRoleN(j));
                            if(roleadd) {
                                const r = await ranks.findOne(query);
                                await r.updateOne({ role_id: `${roleadd.id}`});
                                await r.save();
                            }
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
                            .setDescription(`**Linked role table successfully.**`)
                        message.channel.send(el2embed);
                    }
                } else {
                    const elembed = new Discord.MessageEmbed()
                        .setColor('#dd4545')
                        .setDescription(`**Roles are already linked.**`)
                    message.channel.send(elembed);
                }
            } else {
                const el2embed = new Discord.MessageEmbed()
                    .setColor('#dd4545')
                    .setDescription(`**Create a role table first.**`)
                message.channel.send(el2embed);
            }
        }
    }
}