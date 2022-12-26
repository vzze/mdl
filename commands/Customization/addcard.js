const { MessageEmbed } = require("discord.js-light");

module.exports = {
    name: 'addcard',
    aliases: ['ac', 'addc'],
    description: 'Add your own custom rank card!',
    usage: ['addcard <Imgur Link>'],
    cooldown: 5,
    premium: "Non-Premium",
    async execute(mdl, message, args) {
        const u = await mdl.db.users.findOne({ user_id: message.author.id });
        if(!u || u.level < 20) {
            return message.channel.send(new MessageEmbed()
                .setColor(mdl.config.errcol)
                .setDescription("``` Your level must be at least 20 ```"));
        }
        if(!args[0]) {
            return message.channel.send(new MessageEmbed()
                .setColor(mdl.config.errcol)
                .setDescription("``` You must provide an Imgur link. ```"));
        }
        if(args[0].indexOf("imgur.com") == -1) {
            return message.channel.send(new MessageEmbed()
                .setColor(mdl.config.errcol)
                .setDescription("``` Must be an Imgur link. ```"))
        }
        if(args[0].endsWith(".png") || args[0].endsWith(".jpg") || args[0].endsWith(".jpeg")) {
            await u.updateOne({ rankcardlink: `${args[0]}` })
                .then(() => {
                    message.channel.send(new MessageEmbed()
                        .setColor(mdl.config.pcol)
                        .setDescription("``` Succesfully updated your rank card. ```"));
                })
                .catch(e => {
                    message.channel.send(new MessageEmbed()
                        .setColor(mdl.config.errcol)
                        .setDescription("``` Caught an error. ```"));
                });
            await u.save();
        } else {
            message.channel.send(new MessageEmbed()
                .setColor(mdl.config.errcol)
                .setDescription("``` Must be the image adress. ```"))
        }
    }
}