const { MessageEmbed } = require("discord.js-light");

module.exports = {
    name: 'avatar',
    aliases: ['av'],
    description: 'Sends a users avatar.',
    usage: ['avatar', 'av <User>'],
    cooldown: 2,
    premium: "Non-Premium",
    execute(mdl, message, args) {
        const target = message.mentions.users.first() || message.author;
        message.channel.send(new MessageEmbed()
            .setColor(mdl.config.pcol)
            .setTitle(`${target.tag}'s avatar`)
            .setImage(target.displayAvatarURL({ format: "png", dynamic: true, size: 1024 })));
    }
}