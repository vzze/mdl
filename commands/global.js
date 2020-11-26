const { DiscordAPIError } = require("discord.js")
const Discord = require(`discord.js`);
const config = require('../config/config.json')

const pref = config.prefix;

module.exports = {
	name: 'global',
	description: 'Displays the global leaderboard.',
    usage: `\`${pref}global\` \n \`${pref}global\` 5`,
    cooldown: 10,
    async execute(client, message, args, users, ranks, Canvas, lvls) {
        function stringify(usern) {
            let privateusern = usern.substring(0, usern.length - 5)
            return privateusern;
        }
        if(!args[0]) {
            try {
                const u = await users.find();
                u.sort((a, b) => b.xp - a.xp)
                const uarray = Array.from(u);
                const leadembed = new Discord.MessageEmbed()
                        .setColor('#ad26d1')
                        .setTitle(`Global Leaderboard`)
                        .setURL('https://discord.gg/mandem')
                        .addField('Top 10',
                            uarray.slice(0, 10)
                                .map((user, position) => `**${position + 1}**. \`${stringify(user.user_name)}\``)
                                .join('\n'), true
                        )
                        .addField('Level',
                            uarray.slice(0, 10)
                                .map((user) => `\`${user.level}\``)
                                .join('\n'), true
                        )
                        .addField('XP',
                            uarray.slice(0, 10)
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
                        const leadembed = new Discord.MessageEmbed()
                                .setColor('#ad26d1')
                                .setTitle(`Global Leaderboard`)
                                .setURL('https://discord.gg/mandem')
                                .addField(`Top ${args[0]}`,
                                    uarray.slice(0, args[0])
                                        .map((user, position) => `**${position + 1}**. \`${stringify(user.user_name)}\``)
                                        .join('\n'), true
                                )
                                .addField('Level',
                                    uarray.slice(0, args[0])
                                        .map((user) => `\`${user.level}\``)
                                        .join('\n'), true
                                )
                                .addField('XP',
                                    uarray.slice(0, args[0])
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