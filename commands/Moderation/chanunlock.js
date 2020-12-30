const { MessageEmbed } = require("discord.js");
const { prefix, primarycol, errcol } = require("../../config/config.json");

module.exports = {
    name: "chanunlock",
    description: "Unlocks a locked channel.",
    usage: `\`${prefix}chanunlock\``,
    cooldown: 3,
    premium: "Non-Premium",
    execute(client, message, args) {
        const target = message.author;
        const member = message.guild.member(target);
        if(!member.hasPermission("MANAGE_CHANNELS")) {
            const authnoperm = new MessageEmbed()
                .setColor(errcol)
                .setDescription("You don\`t have the required permissions.");
            return message.channel.send(authnoperm);
        }
        if(!message.guild.member(client.user.id).hasPermission("MANAGE_CHANNELS")) {
            const noelembed = new MessageEmbed()
                .setColor(errcol)
                .setDescription(`I don\'t have the required permissions.`)
            return message.channel.send(noelembed);
        }
        message.channel.updateOverwrite(message.guild.id, {
            SEND_MESSAGES: true,
        })
        let o = new MessageEmbed()
            .setColor(primarycol)
            .setDescription(`Unlocked #${message.channel.name}`)
        message.channel.send(o);
    }
}