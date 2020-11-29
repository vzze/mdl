const { DiscordAPIError } = require("discord.js")
const Discord = require(`discord.js`);
const config = require('../config/config.json')
const pref = config.prefix;

module.exports = {
	name: 'leaderboard',
	description: 'Displays the local leaderboard.',
    usage: `\`${pref}leaderboard\` \n \`${pref}leaderboard\` 5`,
    cooldown: 4,
    async execute(client, message, args, users, ranks, Canvas, lvls) {
        if(!args[0]) {
            try {
                const u = await users.find();
                u.sort((a, b) => b.xp - a.xp)
                const uarray = Array.from(u);
                const localarray = uarray.filter(u => message.guild.members.cache.has(u.user_id));
                const leadembed = new Discord.MessageEmbed()
                        .setColor('#ad26d1')
                        .setTitle(`${message.guild.name} Leaderboard`)
                        .setURL("https://discord.com/invite/FAARS2NdjE")
                        .addField('Top 10',
                            localarray.slice(0, 10)
                                .map((user, position) => `**${position + 1}**. \`${user.user_name}\``)
                                .join('\n'), true
                        )
                        .addField('Level',
                        localarray.slice(0, 10)
                                .map((user) => `\`${user.level}\``)
                                .join('\n'), true
                        )
                        .addField('XP',
                        localarray.slice(0, 10)
                                .map((user) => `\`${user.xp}\``)
                                .join('\n'), true
                        )
                    message.channel.send(leadembed)
            } catch (e) {
                const err3embed = new Discord.MessageEmbed()
                    .setColor('#dd4545')
                    .setDescription(`**No users have talked for a leaderboard to be generated.**`)
                message.channel.send(err3embed);
            } 
        } else {
            if(!isNaN(args[0])) {
                if(args[0] >= 1 && args[0] <= 30) {
                    args[0] = Math.floor(args[0]);
                    try {
                        const u = await users.find();
                        u.sort((a, b) => b.xp - a.xp)
                        const uarray = Array.from(u);
                        const localarray = uarray.filter(u => message.guild.members.cache.has(u.user_id));
                        const leadembed = new Discord.MessageEmbed()
                                .setColor('#ad26d1')
                                .setTitle(`${message.guild.name} Leaderboard`)
                                .addField(`Top ${args[0]}`,
                                localarray.slice(0, args[0])
                                        .map((user, position) => `**${position + 1}**. \`${user.user_name}\``)
                                        .join('\n'), true
                                )
                                .addField('Level',
                                localarray.slice(0, args[0])
                                        .map((user) => `\`${user.level}\``)
                                        .join('\n'), true
                                )
                                .addField('XP',
                                localarray.slice(0, args[0])
                                        .map((user) => `\`${user.xp}\``)
                                        .join('\n'), true
                                )
                            message.channel.send(leadembed)
                    } catch (e) {
                        const err3embed = new Discord.MessageEmbed()
                            .setColor('#dd4545')
                            .setDescription(`**No users have talked for a leaderboard to be generated.**`)
                        message.channel.send(err3embed);
                    }
                } else {
                    const err3embed = new Discord.MessageEmbed()
                        .setColor('#dd4545')
                        .setDescription(`**Must be inbetween 1 and 50.**`)
                    message.channel.send(err3embed);
                }
            } else {
                const err2embed = new Discord.MessageEmbed()
                    .setColor('#dd4545')
                    .setDescription(`**Must be a number**`)
                message.channel.send(err2embed);
            }
        }
    }
}
