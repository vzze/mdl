const { MessageEmbed, DiscordAPIError} = require(`discord.js`);
const {prefix, primarycol, errcol} = require('../../config/config.json')
const members = require("../../data/guildusers");

module.exports = {
	name: 'leaderboard',
	description: 'Displays the local leaderboard.',
    usage: `\`${prefix}leaderboard\` \n \`${prefix}leaderboard\` 5`,
    cooldown: 4,
    premium: "Non-Premium",
    async execute(client, message, args) {
        if(!args[0]) {
            try {
                const u = await members.find({ guild_id: message.guild.id});
                u.sort((a, b) => b.xp - a.xp)
                const uarray = Array.from(u);
                const leadembed = new MessageEmbed()
                        .setColor(primarycol)
                        .setTitle(`${message.guild.name} Leaderboard`)
                        .setURL("https://discord.com/invite/FAARS2NdjE")
                        .addField('Top 10',
                            uarray.slice(0, 10)
                                .map((user, position) => `**${position + 1}**. \`${user.user_name}\``)
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
                const err3embed = new MessageEmbed()
                    .setColor(errcol)
                    .setDescription(`**No users have talked for a leaderboard to be generated.**`)
                message.channel.send(err3embed);
            } 
        } else {
            if(!isNaN(args[0])) {
                if(args[0] >= 1 && args[0] <= 30) {
                    args[0] = Math.floor(args[0]);
                    try {
                        const u = await members.find({ guild_id: message.guild.id});
                        u.sort((a, b) => b.xp - a.xp)
                        const uarray = Array.from(u);
                        const leadembed = new MessageEmbed()
                                .setColor(primarycol)
                                .setTitle(`${message.guild.name} Leaderboard`)
                                .setURL("https://discord.com/invite/FAARS2NdjE")
                                .addField(`Top ${args[0]}`,
                                uarray.slice(0, args[0])
                                        .map((user, position) => `**${position + 1}**. \`${user.user_name}\``)
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
                            .setColor(errcol)
                            .setDescription(`**No users have talked for a leaderboard to be generated.**`)
                        message.channel.send(err3embed);
                    }
                } else {
                    const err3embed = new Discord.MessageEmbed()
                        .setColor(errcol)
                        .setDescription(`**Must be inbetween 1 and 30.**`)
                    message.channel.send(err3embed);
                }
            } else {
                const err2embed = new Discord.MessageEmbed()
                    .setColor(errcol)
                    .setDescription(`**Must be a number**`)
                message.channel.send(err2embed);
            }
        }
    }
}