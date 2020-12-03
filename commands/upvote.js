const Discord = require(`discord.js`);
const config = require('../config/config.json')
const pref = config.prefix;

module.exports = {
    name: 'upvote',
    description: 'Sends a message with a hyper link to upvote the bot on top.gg',
    usage: `\`${pref}upvote\``,
    cooldown: 1,
    async execute(client, message, args) {
        const l4embed = new Discord.MessageEmbed()
            .setColor('#ad26d1')
            .setAuthor(`DBL`, `${message.client.user.displayAvatarURL()}`)
            .setDescription(`[Click here](https://top.gg/bot/776551374380204033) to upvote.`)
        message.channel.send(l4embed);
    }
}