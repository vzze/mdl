const { MessageEmbed } = require("discord.js");
const { prefix, primarycol, errcol } = require("../../config/config.json");

module.exports = {
    name: "massmute",
    description: "Works like a usual mute command but you can mute more than 1 user at once. \n The number defaults to minutes.",
    usage: `\`${prefix}massmute\` 60 <User> \n \`${prefix}massmute\` 0.5 <User1> <User2>`,
    cooldown: 5,
    premium: "Non-Premium",
    execute(client, message, args) {
        const target = message.author;
        const member = message.guild.member(target);
        if(!member.hasPermission("MANAGE_ROLES")) {
            const authnoperm = new MessageEmbed()
                .setColor(errcol)
                .setDescription("You don\` have the required permissions.");
            return message.channel.send(authnoperm);
        }
        if(!message.guild.member(client.user.id).hasPermission("MANAGE_ROLES")) {
            const noelembed = new MessageEmbed()
                .setColor(errcol)
                .setDescription(`I don\'t have the required permissions.`)
            return message.channel.send(noelembed);
        }
        if(!args[0]) return;
        if(!message.mentions.users.first()) return;
        let muterole = message.guild.roles.cache.find(r => r.name.toLowerCase() == "muted");
        if(!muterole) {
            message.guild.roles.create({
                data: {
                    name: 'Muted',
                }
            }).then(async r => {
                await message.guild.channels.cache.forEach(async ch => {
                    await ch.updateOverwrite(r, {
                        SEND_MESSAGES: false,
                        SEND_TTS_MESSAGES: false,
                        ADD_REACTIONS: false,
                        SPEAK: false
                    })
                })
                let arr = [];
                if(isNaN(args[0])) {
                    message.mentions.users.forEach(m => {
                        let member = message.guild.member(m);
                        member.roles.add(r);
                        arr.push(m.tag);
                    })
                } else if(!isNaN(args[0])) {
                    let minute = 60000;
                    message.mentions.users.forEach(m => {
                        let member = message.guild.member(m);
                        member.roles.add(r)
                        arr.push(m.tag);
                        setTimeout(() => {
                            if(member.roles.cache.has(r)) member.roles.remove(r);
                        }, args[0]*minute);
                    })
                }
                let op = new MessageEmbed()
                    .addField('Muted', 
                        "> " + arr.map(t => `\`${t}\``)
                            .join(", ")
                    )
                    .setColor(primarycol)
                message.channel.send(op);
            })
        } else {
            let arr = [];
            if(isNaN(args[0])) {
                message.mentions.users.forEach(m => {
                    let member = message.guild.member(m);
                    member.roles.add(muterole);
                    arr.push(m.tag);
                })
            } else if(!isNaN(args[0])) {
                let minute = 60000;
                message.mentions.users.forEach(m => {
                    let member = message.guild.member(m);
                    member.roles.add(muterole)
                    arr.push(m.tag);
                    setTimeout(async () => {
                        try {
                            await member.roles.remove(muterole);
                        } catch (e) {

                        }
                    }, args[0]*minute);
                })
            }
            let op = new MessageEmbed()
                .addField('Muted', 
                    "> " + arr.map(t => `\`${t}\``)
                        .join(", ")
                )
                .setColor(primarycol)
            message.channel.send(op);
        }
    }
}