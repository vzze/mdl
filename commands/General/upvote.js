const { MessageEmbed } = require(`discord.js`);
const {prefix, primarycol} = require('../../config/config.json')

module.exports = {
    name: 'upvote',
    description: 'Sends a message with a hyper link to upvote the bot on top.gg',
    usage: `\`${prefix}upvote\``,
    cooldown: 3,
    premium: "Non-Premium",
    async execute(client, message, args) {
        const l4embed = new MessageEmbed()
            .setColor(primarycol)
            .setAuthor(`DBL`, `${message.client.user.displayAvatarURL()}`)
            .setDescription(`[Click here](https://top.gg/bot/776551374380204033) to upvote.`)
        message.channel.send(l4embed);
    }
}