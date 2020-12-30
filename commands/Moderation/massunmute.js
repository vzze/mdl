const { MessageEmbed } = require("discord.js");
const { prefix, primarycol, errcol } = require("../../config/config.json");

module.exports = {
    name: "massunmute",
    description: "Works like a traditional unmute command, but you can use it on multiple members at once.",
    usage: `\`${prefix}massunmute\` <User> \n \`${prefix}massunmute\` <User1> <User2>...`,
    cooldown: 5,
    premium: "Non-Premium",
    execute(client, message, args) {
        const target = message.author;
        const member = message.guild.member(target);
        if(!member.hasPermission("MANAGE_ROLES")) {
            const authnoperm = new MessageEmbed()
                .setColor(errcol)
                .setDescription("You don\`t have the required permissions.");
            return message.channel.send(authnoperm);
        }
        if(!message.guild.member(client.user.id).hasPermission("MANAGE_ROLES")) {
            const noelembed = new MessageEmbed()
                .setColor(errcol)
                .setDescription(`I don\'t have the required permissions.`)
            return message.channel.send(noelembed);
        }
        let muterole = message.guild.roles.cache.find(r => r.name.toLowerCase() == "muted");
        if(!muterole) return;
        if(!message.mentions.users.first()) return;
        let arr = [];
        message.mentions.users.forEach(async m => {
            let member = message.guild.member(m);
            arr.push(m.tag);
            try {
                await member.roles.remove(muterole);
            } catch (e) {
                arr.pop();
            }
        })
        let op = new MessageEmbed()
            .addField('Unmuted', 
                "> " + arr.map(t => `\`${t}\``)
                    .join(", ")
            )
            .setColor(primarycol)
        message.channel.send(op);
    }
}