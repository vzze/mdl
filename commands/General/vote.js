const { MessageEmbed } = require("discord.js-light");

module.exports = {
    name: 'vote',
    aliases: ['vt'],
    description: 'A link to vote for the bot!',
    usage: ['vote'],
    cooldown: 2,
    premium: "Non-Premium",
    execute(mdl, message, args) {
        message.channel.send(new MessageEmbed()
            .setColor(mdl.config.pcol)
            .setDescription("[Vote](https://top.gg/bot/776551374380204033/vote)"));
    }
}