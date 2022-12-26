const { MessageEmbed } = require("discord.js-light");

module.exports = {
    name: 'warn',
    aliases: ['w'],
    description: 'Warns a member.',
    usage: ['warn <Member>', 'w <Member>'],
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
        let pos = message.content.indexOf(">");
        let warn = message.content.slice(pos+1, message.content.length);
        warn = warn.trim();
        if(warn == "" || warn == undefined) warn = "No information provided.";
        let m = await mdl.db.members.findOne({ user_id: target.id, guild_id: message.guild.id });
        if(!m) m = await mdl.db.createnewmember(target.id, message.guild.id, target.tag);
        message.channel.send(new MessageEmbed()
            .setDescription("```prolog\n" + `Warned User :: ${target.tag}\nFor         :: ${warn}\n` + "```")
            .setColor(mdl.config.pcol));
        warn = `Moderator :: ${message.author.tag} :: ${warn}`;
        m.warns.push(warn);
        await m.updateOne({ warns: m.warns });
        await m.save();
    }
}