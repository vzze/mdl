const { DiscordAPIError } = require("discord.js")
const Discord = require(`discord.js`);
const pref = require('../config/config.json');

module.exports = {
    name: 'linkrole',
    description: "Links a role.",
    usage: `\`${pref.prefix}linkrole\` <RoleID> <Level> \n \`${pref.prefix}linkrole\` 774601811428114432 5`,
    cooldown: 2,
    async execute(client, message, args, users, ranks, Canvas, lvls) {
        let data = await ranks.findOne({ guild_id: message.guild.id, rank_id: 100 });
        if(!data) {
            for(var j = 100; j >= 1; j = j - 1) {
                const newGuild = new ranks({ guild_id: `${guild.id}`, rank_id: j, role_id: '0'});
                newGuild.save();
            }
            setTimeout(() => {}, 1000);
            data = await ranks.findOne({ guild_id: message.guild.id, rank_id: 100 });
        }
        const target = message.author;
        const member = message.guild.member(target);
        if(member.hasPermission("ADMINISTRATOR")) {
            if(args[0]) {
                if(args[1]) {
                    if(!isNaN(args[1]) && args[1] >= 1 && args[1] <= 100) {
                        var ok = 1;
                        var query = { guild_id: message.guild.id, rank_id: args[1]}
                        try {
                            let roleadd  = await message.guild.roles.cache.get(`${args[0]}`);
                            if(roleadd) {
                                const r = await ranks.findOne(query);
                                await r.updateOne({ role_id: `${args[0]}`});
                                await r.save();
                            } else {
                                const elembed = new Discord.MessageEmbed()
                                    .setColor('#dd4545')
                                    .setDescription(`**Role does not exist.**`)
                                message.channel.send(elembed);
                                ok = 0;
                            }
                        } catch (e) {
                            const elembed = new Discord.MessageEmbed()
                            .setColor('#dd4545')
                            .setDescription(`**Caught an error.**`)
                            message.channel.send(elembed);
                            ok = 0;
                       }
  
                        if(ok==1) {
                            const el2embed = new Discord.MessageEmbed()
                                .setColor('#ad26d1')
                                .setDescription(`**Linked role successfully.**`)
                            message.channel.send(el2embed);
                        }
                    } else {
                        const el5embed = new Discord.MessageEmbed()
                            .setColor('#dd4545')
                            .setDescription(`**Must be a number and must be inbetween 1-100.**`)
                        message.channel.send(el5embed);
                    }
                } else {
                    const el4embed = new Discord.MessageEmbed()
                        .setColor('#dd4545')
                        .setDescription(`**Must mention the position (level) for the role.**`)
                    message.channel.send(el4embed);
                }
            } else {
                const el3embed = new Discord.MessageEmbed()
                    .setColor('#dd4545')
                    .setDescription(`**Must mention the role ID.**`)
                message.channel.send(el3embed);
            }
        } else {
            const el3embed = new Discord.MessageEmbed()
                .setColor('#dd4545')
                .setDescription(`**Must be an Admin.**`)
            message.channel.send(el3embed);
        }
    }
}