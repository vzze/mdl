const { DiscordAPIError } = require("discord.js")
const Discord = require(`discord.js`);
const pref = require('../config/config.json')

module.exports = {
    name: 'createroletable',
    description: "Creates a role table with a given number",
    usage: `\`${pref.prefix}createroletable\` 5`,
    cooldown: 5,
    async execute(client, message, args, users, ranks, Canvas, lvls) {
        function levelRoleN(a) {
            var b = `Level ${a}`
            return b;
        }
        const target = message.author;
        const member = message.guild.member(target);
        if(member.hasPermission("ADMINISTRATOR")) {
            if(args[0]) {
                if(!isNaN(args[0])) {
                    if(args[0] >= 1 && args[0] <= 100) {
                        let data = await ranks.findOne({ guild_id: message.guild.id, rank_id: 100 });
                        let levelrolecheck = data.role_id;
                        if(levelrolecheck=='0') {
                            args[0] = Math.floor(args[0]);
                            for(var j = 100; j >= 1; j = j - 1) {
                                if(j==100) {
                                    await message.guild.roles.create({
                                        data: {
                                            name: levelRoleN(j),
                                        }
                                    });
                                } else {
                                    if(j<100 && j%args[0]==0) {
                                        await message.guild.roles.create({
                                            data: {
                                                name: levelRoleN(j),
                                            }
                                        });
                                    }
                                }
                            }
                            const scembed = new Discord.MessageEmbed()
                                .setColor('#ad26d1')
                                .setDescription(`**Created role table successfully.**`)
                            await message.channel.send(scembed);
                        } else {
                            const sc2embed = new Discord.MessageEmbed()
                                .setColor('#dd4545')
                                .setDescription(`**The role table already exists.**`)
                            message.channel.send(sc2embed);
                        }
                        
                    } else {
                        const sc3embed = new Discord.MessageEmbed()
                            .setColor('#dd4545')
                            .setDescription(`**Argument must be inbetween 1 and 100.**`)
                        message.channel.send(sc3embed);
                    }
                } else {
                    const err2embed = new Discord.MessageEmbed()
                        .setColor('#dd4545')
                        .setDescription(`**Must be a number**`)
                    message.channel.send(err2embed);
                }
            } else {
                const sc4embed = new Discord.MessageEmbed()
                    .setColor('#dd4545')
                    .setDescription(`**Provide Level Gap difference.**`)
                message.channel.send(sc4embed);
            }
        } else {
            return;
        }
 
    }
}