const { MessageEmbed } = require(`discord.js`);
const {prefix, primarycol} = require('../../config/config.json')

module.exports = {
    name: 'support',
    description: 'Sends a message with a hyper link to join the bots support server.',
    usage: `\`${prefix}support\``,
    cooldown: 3,
    premium: "Non-Premium",
    async execute(client, message, args) {
        const l4embed = new MessageEmbed()
            .setColor(primarycol)
            .setAuthor(`Support Server`, `${message.client.user.displayAvatarURL()}`)
            .setDescription(`[Click here](https://discord.gg/FAARS2NdjE) to join our support server.`)
        message.channel.send(l4embed);
    }
}