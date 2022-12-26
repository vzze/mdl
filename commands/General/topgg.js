const { MessageEmbed } = require("discord.js-light");

module.exports = {
    name: 'topgg',
    aliases: ['top'],
    description: 'The bot\'s Topgg page.',
    usage: ['topgg'],
    cooldown: 2,
    premium: "Non-Premium",
    execute(mdl, message, args) {
        message.channel.send(new MessageEmbed()
            .setColor(mdl.config.pcol)
            .setDescription("[TOPGG](https://top.gg/bot/776551374380204033)"));
    }
}