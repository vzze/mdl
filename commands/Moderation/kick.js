const { MessageEmbed } = require("discord.js-light");

module.exports = {
    name: 'kick',
    aliases: ['ki'],
    description: 'Kicks a member.',
    usage: ['kick <Member>'],
    cooldown: 3,
    premium: "Non-Premium",
    async execute(mdl, message, args) {
        const member = await message.guild.members.fetch(message.author.id, { cache: false });
        await message.guild.roles.fetch();
        if(!member.hasPermission("KICK_MEMBERS") && !member.hasPermission("ADMINISTRATOR")) {
            message.guild.roles.cache.clear();
            return message.channel.send(new MessageEmbed()
                .setDescription("``` You don\`t have permissions to manage roles. ```")
                .setColor(mdl.config.errcol))
        }
        const target = message.mentions.users.first();
        if(!target) return message.guild.roles.cache.clear();
        const mkc = await message.guild.members.fetch(target.id, { cache: false });
        if(!mkc) return message.guild.roles.cache.clear();
        if(mkc.roles.highest.position >= member.roles.highest.position) {
            message.guild.roles.cache.clear();
            return message.channel.send(new MessageEmbed()
                .setDescription("``` That member is higher than you. ```")
                .setColor(mdl.config.errcol));
        }
        if(!mkc.kickable) {
            message.guild.roles.cache.clear();
            return message.channel.send(new MessageEmbed()
                .setDescription("``` I cannot kick that member. ```")
                .setColor(mdl.config.errcol));
        }
        mkc.kick();
        message.guild.roles.cache.clear();
        message.channel.send(new MessageEmbed()
            .setColor(mdl.config.pcol)
            .setDescription(`\`\`\`prolog\nKicked :: ${message.mentions.users.first().tag}\n\`\`\``));
    }
}