const { MessageEmbed } = require("discord.js-light");

module.exports = {
    name: 'autovc',
    aliases: ['avc'],
    description: 'Creates an auto VC category with the main VC.',
    usage: ['autovc <Category Name> <Main VC Name>', 'autovc'],
    cooldown: 30,
    premium: "Premium",
    async execute(mdl, message, args) {
        const member = await message.guild.members.fetch(message.author.id, { cache: false });
        if(!member.hasPermission("ADMINISTRATOR")) {
            return message.channel.send(new MessageEmbed()
                .setDescription("``` You don\`t have permissions to manage roles. ```")
                .setColor(mdl.config.errcol))
        }
        const pname = (args[0]) ? args[0] : "VC";
        const cname = (args[1]) ? args[1] : "Join to Create";
        await message.guild.channels.create(pname, {
            type: "category",
        }).then(async cat => {
            await message.guild.channels.create(cname, {
                type: 'voice',
                parent: cat,
            }).then(async mainc => {
                const s = await mdl.db.servers.findOne({ guild_id: message.guild.id });
                await s.updateOne({ autovcparent: cat.id, autovcchannel: mainc.id });
                mdl.pservers.set(message.guild.id, {
                    parent: cat.id, 
                    mainvc: mainc.id,
                    wrole: s.whitelisterolevc,
                    svcard: s.defaultlevelimage
                });
            })
        }).catch(e => {
            message.channel.send(new MessageEmbed()
                .setColor(mdl.config.errcol)
                .setDescription("``` I cannot manage channels. ```"))
        });
    }
}