const { MessageEmbed } = require("discord.js-light");

module.exports = {
    name: 'cardavatar',
    aliases: ['ca', 'cav', 'cavatar'],
    description: 'Choose to display or to not display your avatar on the rank card.',
    usage: ['cardavatar'],
    cooldown: 3,
    premium: "Non-Premium",
    async execute(mdl, message, args) {
        const u = await mdl.db.users.findOne({ user_id: message.author.id });
        if(!u) u = await mdl.db.createnewuser(message.author.id, 0, message.author.tag);
        switch(u.rankavatar) {
            case 1:
                await u.updateOne({ rankavatar: 0 })
                    .then(() => {
                        message.channel.send(new MessageEmbed()
                            .setColor(mdl.config.pcol)
                            .setDescription("``` Your avatar will be invisible. ```"));
                    })
                    .catch(e => {
                        message.channel.send(new MessageEmbed()
                            .setColor(mdl.config.errcol)
                            .setDescription("``` Caught an error. ```"))
                    });
            break;
            case 0:
                await u.updateOne({ rankavatar: 1 })
                .then(() => {
                    message.channel.send(new MessageEmbed()
                        .setColor(mdl.config.pcol)
                        .setDescription("``` Your avatar will be visible. ```"));
                })
                .catch(e => {
                    message.channel.send(new MessageEmbed()
                        .setColor(mdl.config.errcol)
                        .setDescription("``` Caught an error. ```"))
                });
            break;
        }
    }
}