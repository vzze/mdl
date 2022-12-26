const { MessageEmbed } = require("discord.js-light");

module.exports = {
    name: 'invite',
    aliases: ['inv'],
    description: 'Gives an invite link so you can invite the bot!',
    usage: ['invite'],
    cooldown: 2,
    premium: "Non-Premium",
    execute(mdl, message, args) {
        message.channel.send(new MessageEmbed()
            .setColor(mdl.config.pcol)
            .setDescription("To Invite me to your server [click here](https://discord.com/api/oauth2/authorize?client_id=776551374380204033&permissions=8&scope=bot)."));
    }
}