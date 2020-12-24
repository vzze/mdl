const { MessageEmbed } = require(`discord.js`);
const {prefix, primarycol} = require('../../config/config.json')

module.exports = {
    name: 'invite',
    description: 'Sends a message with a hyper link to invite the bot.',
    usage: `\`${prefix}invite\``,
    cooldown: 3,
    premium: "Non-Premium",
    async execute(client, message, args) {
        const l4embed = new MessageEmbed()
            .setColor(primarycol)
            .setAuthor(`Server Invite`, `${message.client.user.displayAvatarURL()}`)
            .setDescription(`To Invite me to your server [click here](https://discord.com/api/oauth2/authorize?client_id=776551374380204033&permissions=268553216&scope=bot).`)
        message.channel.send(l4embed);
    }
}