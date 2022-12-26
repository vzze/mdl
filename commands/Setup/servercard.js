const { MessageEmbed } = require("discord.js-light");

module.exports = {
    name: 'servercard',
    aliases: ['svc', 'svcard', 'serverc'],
    description: 'Sets the servers default level card.',
    usage: ['svc <Imgur Link>', 'svcard remove'],
    cooldown: 5,
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
        message.guild.roles.cache.clear();
        if(!args[0]) {
            return message.channel.send(new MessageEmbed()
                .setColor(mdl.config.errcol)
                .setDescription("``` You must provide an Imgur link. ```"));
        }
        if(args[0] == "remove") {
            const c = await mdl.db.servers.findOne({ guild_id: `${message.guild.id}` });
            await c.updateOne({ defaultlevelimage: 0 });
            let obj = mdl.pservers.get(message.guild.id);
            obj.svcard = 0;
            mdl.pservers.set(message.guild.id, obj);
            return message.channel.send(new MessageEmbed()
                .setColor(mdl.config.pcol)
                .setDescription("``` Removed custom server card. ```"));
        }
        if(args[0].indexOf("imgur.com") == -1) {
            return message.channel.send(new MessageEmbed()
                .setColor(mdl.config.errcol)
                .setDescription("``` Must be an Imgur link. ```"))
        }
        if(args[0].endsWith(".png") || args[0].endsWith(".jpg") || args[0].endsWith(".jpeg")) {
            const u = await mdl.db.servers.findOne({ guild_id: message.guild.id });
            await u.updateOne({ defaultlevelimage: `${args[0]}` })
                .then(() => {
                    let obj = mdl.pservers.get(message.guild.id);
                    obj.svcard = args[0];
                    mdl.pservers.set(message.guild.id, obj);
                    message.channel.send(new MessageEmbed()
                        .setColor(mdl.config.pcol)
                        .setDescription("``` Succesfully updated server rank card. ```"));
                })
                .catch(e => {
                    message.channel.send(new MessageEmbed()
                        .setColor(mdl.config.errcol)
                        .setDescription("``` Caught an error. ```"));
                });
        } else {
            message.channel.send(new MessageEmbed()
                .setColor(mdl.config.errcol)
                .setDescription("``` Must be the image adress. ```"))
        }
    }
}