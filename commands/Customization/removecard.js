const { MessageEmbed } = require("discord.js-light");

module.exports = {
    name: 'removecard',
    aliases: ['rc', 'rcard', 'removec'],
    description: 'Reverts to the default rank card image.',
    usage: ['removecard'],
    cooldown: 3,
    premium: "Non-Premium",
    async execute(mdl, message, args) {
        const u = await mdl.db.users.findOne({ user_id: message.author.id });
        if(!u || u.level < 20) {
            return message.channel.send(new MessageEmbed()
                .setColor(mdl.config.errcol)
                .setDescription("``` Your level must be at least 20 ```"));
        }
        await u.updateOne({ rankcardlink: 0 })
                .then(() => {
                    return message.channel.send(new MessageEmbed()
                        .setColor(mdl.config.pcol)
                        .setDescription("``` Removed your rank card. ```"));
                })
                .catch(e => {
                    return message.channel.send(new MessageEmbed()
                        .setColor(mdl.config.errcol)
                        .setDescription("``` Caught an error. ```"));
                });
    }
}