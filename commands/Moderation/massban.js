const { MessageEmbed, Collection } = require("discord.js");
const { prefix, primarycol, errcol } = require("../../config/config.json");

module.exports = {
    name: 'massban',
    description: 'Works like a usual ban command but you can select more than 1 user.',
    usage: `\`${prefix}massban\` <User> \n \`${prefix}massban\` <User1> <User2>...`,
    cooldown: 5,
    premium: "Non-Premium",
    execute(client, message, args) {
        const target = message.author;
        const member = message.guild.member(target);
        if(!member.hasPermission("BAN_MEMBERS")) {
            const authnoperm = new MessageEmbed()
                .setColor(errcol)
                .setDescription("You don\`t have the required permissions.");
            return message.channel.send(authnoperm);
        }
        if(!message.guild.member(client.user.id).hasPermission("BAN_MEMBERS")) {
            const noelembed = new MessageEmbed()
                .setColor(errcol)
                .setDescription(`I don\'t have the required permissions.`)
            return message.channel.send(noelembed);
        }
        if(!args[0]) return;
        if(!message.mentions.users.first()) return;
        
        let full = new Collection();
        message.mentions.users.forEach(m => {
            let member = message.guild.member(m);
            if(member.bannable==true) {
                member.ban();
                full.set(m.id, {member: m, tf: true});
            } else {
                full.set(m.id, {member: m, tf: false});
            }                    
        })

        const [unsucc, succ] = full.partition(u => u.tf == false);

        let op = new MessageEmbed()
            .addField('Successful bans', 
                "> " + succ.map(t => `\`${t.member.tag}\``)
                    .join(", ")
            )
            .addField('Unsuccessful bans',
                "> " + unsucc.map(p => `\`${p.member.tag}\``)
                    .join(", ")
            )
            .setColor(primarycol)
        message.channel.send(op);
    }
}