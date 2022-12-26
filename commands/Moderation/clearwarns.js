const { MessageEmbed } = require("discord.js-light");

module.exports = {
    name: 'clearwarns',
    aliases: ['cwarns', 'cws'],
    description: 'Clears warns of a member.',
    usage: ['clearwarns <Member>'],
    cooldown: 3,
    premium: "Non-Premium",
    async execute(mdl, message, args) {
        const member = await message.guild.members.fetch(message.author.id, { cache: false });
        if(!member.hasPermission("MANAGE_ROLES") && !member.hasPermission("ADMINISTRATOR")) {
            return message.channel.send(new MessageEmbed()
                .setDescription("``` You don\`t have permissions to manage roles. ```")
                .setColor(mdl.config.errcol))
        }
        const target = message.mentions.users.first();
        if(!target) return;
        message.channel.send(new MessageEmbed()
            .setColor(mdl.config.pcol)
            .setDescription("```prolog\n" + `Removed warns for :: ${target.tag}` +"\n```"));
        let m = await mdl.db.members.findOne({ user_id: target.id, guild_id: message.guild.id });
        if(!m) { m = await mdl.db.createnewmember(target.id, message.guild.id, target.tag); return;}
        await m.updateOne({ warns: [] });
        await m.save();
    }

}