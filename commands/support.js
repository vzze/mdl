const { MessageEmbed } = require(`discord.js`);
const config = require('../config/config.json')
const pref = config.prefix;

module.exports = {
    name: 'support',
    description: 'Sends a message with a hyper link to join the bots support server.',
    usage: `\`${pref}support\``,
    cooldown: 3,
    async execute(client, message, args) {
        const l4embed = new MessageEmbed()
            .setColor('#ad26d1')
            .setAuthor(`Support Server`, `${message.client.user.displayAvatarURL()}`)
            .setDescription(`[Click here](https://discord.gg/FAARS2NdjE) to join our support server.`)
        message.channel.send(l4embed);
    }
}