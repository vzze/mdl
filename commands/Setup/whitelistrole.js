const { MessageEmbed } = require("discord.js-light");

module.exports = {
    name: 'whitelistrole',
    aliases: ['wlr', 'wlrole', 'whitelr'],
    description: 'Whitelists a role that can access any Auto VC channel. Useful for moderators.',
    usage: ['wlr <RoleID>', 'wlr remove'],
    cooldown: 3,
    premium: "Premium",
    async execute(mdl, message, args) {
        const member = await message.guild.members.fetch(message.author.id, { cache: false });
        await message.guild.roles.fetch();
        if(!member.hasPermission("MANAGE_GUILD") && !member.hasPermission("ADMINISTRATOR")) {
            message.guild.roles.cache.clear();
            return message.channel.send(new MessageEmbed()
                .setDescription("``` You don\`t have permissions to manage roles. ```")
                .setColor(mdl.config.errcol))
        }
        if(args[0] == "remove") {
            message.guild.roles.cache.clear();
            const c = await mdl.db.servers.findOne({ guild_id: `${message.guild.id}` });
            await c.updateOne({ whitelisterolevc: 0 });
            let obj = mdl.pservers.get(message.guild.id);
            obj.wrole = 0;
            mdl.pservers.set(message.guild.id, obj);
            return message.channel.send(new MessageEmbed()
                .setColor(mdl.config.pcol)
                .setDescription("``` Removed whitelisted role. ```"));
        }
        await message.guild.roles.fetch(args[0], { cache: false })
            .then(async r => {
                if(!r.editable) {
                    return message.channel.send(new MessageEmbed()
                        .setDescription("``` I cannot access that role. ```")
                        .setColor(mdl.config.errcol));
                }
                message.guild.roles.cache.clear();
                const c = await mdl.db.servers.findOne({ guild_id: `${message.guild.id}` });
                await c.updateOne({ whitelisterolevc: args[0] });
                let obj = mdl.pservers.get(message.guild.id);
                obj.wrole = args[0];
                mdl.pservers.set(message.guild.id, obj);
                await c.save()
                    .then(() => {
                        return message.channel.send(new MessageEmbed()
                            .setDescription("```prolog\n" + `Whitelisted Role :: ${r.name}\n` + "```")
                            .setColor(mdl.config.pcol))
                    })
                    .catch(e => {
                        return message.channel.send(new MessageEmbed()
                            .setDescription("``` Encountered an error. ```")
                            .setColor(mdl.config.errcol))
                    })
            }).catch(e => {
                message.guild.roles.cache.clear();
                return message.channel.send(new MessageEmbed()
                    .setDescription("``` Role does not exist. ```")
                    .setColor(mdl.config.errcol))
            })
    }
}