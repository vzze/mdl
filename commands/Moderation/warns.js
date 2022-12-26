const { MessageEmbed } = require("discord.js-light");

module.exports = {
    name: 'warns',
    aliases: ['ws'],
    description: 'Shows a members warns.',
    usage: ['warns <Member>', 'ws <Member>'],
    cooldown: 3,
    premium: "Non-Premium",
    async execute(mdl, message, args) {
        const member = await message.guild.members.fetch(message.author.id, { cache: false });
        await message.guild.roles.fetch();
        if(!member.hasPermission("MANAGE_ROLES") && !member.hasPermission("ADMINISTRATOR")) {
            message.guild.roles.cache.clear();
            return message.channel.send(new MessageEmbed()
                .setDescription("``` You don\`t have permissions to manage roles. ```")
                .setColor(mdl.config.errcol))
        }
        message.guild.roles.cache.clear();
        const target = message.mentions.users.first();
        if(!target) return;
        let m = await mdl.db.members.findOne({ user_id: target.id, guild_id: message.guild.id });
        if(!m.warns[0]) {
            return message.channel.send(new MessageEmbed()
                .setColor(mdl.config.pcol)
                .setDescription("```prolog\n" + `U :: ${target.tag} :: No Warns` + "\n```"))
        }
        message.channel.send(new MessageEmbed()
            .setColor(mdl.config.pcol)
            .setDescription("```prolog\n" + `U         :: ${target.tag}\n` +
            m.warns.map(w => `${w}`).join("\n")
            +"\n```"))
    }

}