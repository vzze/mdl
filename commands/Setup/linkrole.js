const { MessageEmbed } = require("discord.js-light");

module.exports = {
    name: 'linkrole',
    aliases: ['lr', 'lrole'],
    description: 'Links a role to a level. To remove a linked role just delete it.',
    usage: ['linkrole <RoleID> <Level>'],
    cooldown: 2,
    premium: "Non-Premium",
    async execute(mdl, message, args) {
        if(!args[0] || !args[1]) return;
        args[1] = Math.floor(args[1]);
        await message.guild.roles.fetch();
        const member = await message.guild.members.fetch(message.author.id, { cache: false });
        if(!member.hasPermission("MANAGE_ROLES") && !member.hasPermission("ADMINISTRATOR")) {
            message.guild.roles.cache.clear();
            return message.channel.send(new MessageEmbed()
                .setDescription("``` You don\`t have permissions to manage roles. ```")
                .setColor(mdl.config.errcol))
        }
        if(isNaN(args[1])) {
            message.guild.roles.cache.clear();
            return message.channel.send(new MessageEmbed()
                .setDescription("``` Level must be a number ```")
                .setColor(mdl.config.errcol));
        }
        if(args[1] < 1 || args[1] > 150) {
            message.guild.roles.cache.clear();
            return message.channel.send(new MessageEmbed()
                .setDescription("``` Level must be inbetween 1 and 150 ```")
                .setColor(mdl.config.errcol))
        }
        await message.guild.roles.fetch(args[0], { cache: false })
            .then(async r => {
                if(!r.editable) {
                    return message.channel.send(new MessageEmbed()
                        .setDescription("``` I cannot access that role. ```")
                        .setColor(mdl.config.errcol));
                }
                message.guild.roles.cache.clear();
                const c = await mdl.db.ranks.findOne({ guild_id: `${message.guild.id}`, role_id: r.id });
                if(c) {
                    await c.updateOne({ rank_id: args[1] })
                        .then(() => {
                            return message.channel.send(new MessageEmbed()
                                .setDescription("```prolog\n" + `Linked Role :: ${r.name}\nLevel       :: ${args[1]}\n` + "```")
                                .setColor(mdl.config.pcol))
                        })
                        .catch(e => {
                            return message.channel.send(new MessageEmbed()
                                .setDescription("``` Encountered an error. ```")
                                .setColor(mdl.config.errcol))
                        })
                } else {
                    const newr = new mdl.db.ranks({
                        guild_id: `${message.guild.id}`,
                        rank_id: args[1],
                        role_id: `${r.id}`
                    });
                    await newr.save()
                        .then(() => {
                            return message.channel.send(new MessageEmbed()
                                .setDescription("```prolog\n" + `Linked Role :: ${r.name}\nLevel       :: ${args[1]}\n` + "```")
                                .setColor(mdl.config.pcol))
                        })
                        .catch(e => {
                            return message.channel.send(new MessageEmbed()
                                .setDescription("``` Encountered an error. ```")
                                .setColor(mdl.config.errcol))
                        })
                }
            }).catch(e => {
                message.guild.roles.cache.clear();
                return message.channel.send(new MessageEmbed()
                    .setDescription("``` Role does not exist. ```")
                    .setColor(mdl.config.errcol))
            })
    }

}