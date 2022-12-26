const { MessageEmbed } = require("discord.js-light");

module.exports = {
    name: 'primarycolor',
    aliases: ['pcol', 'primaryc', 'pc', 'pcolor'],
    description: 'Change the primary color of the rank card. Only accepts HEX Values',
    usage: ['primarycolor <Hex>', 'pc #fcc0ff', 'primarycolor'],
    cooldown: 3,
    premium: "Non-Premium",
    async execute(mdl, message, args) {
        const u = await mdl.db.users.findOne({ user_id: message.author.id });
        if(!u) u = await mdl.db.createnewuser(message.author.id, 0, message.author.tag);
        if(!args[0]) {
            await u.updateOne({ prcolor: 0 })
                    .then(() => {
                        message.channel.send(new MessageEmbed()
                            .setColor(mdl.config.pcol)
                            .setDescription("``` Updated to default primary color. ```"));
                    })
                    .catch(e => {
                        message.channel.send(new MessageEmbed()
                            .setColor(mdl.config.errcol)
                            .setDescription("``` Caught an error. ```"))
                    });
        } else {
            function c(check) {
                let chars = check.split();
                for(var i = 1; i < 7; i++) {
                    if(chars[i] >= 'g') return false;
                }
                return true;
            }
            if(!args[0].startsWith("#") || args[0].length != 7 || !c(args[0])) {
                return message.channel.send(new MessageEmbed()
                    .setColor(mdl.config.errcol)
                    .setDescription("``` Must be a HEX ```"));
            }
            await u.updateOne({ prcolor: args[0] })
                    .then(() => {
                        message.channel.send(new MessageEmbed()
                            .setColor(mdl.config.pcol)
                            .setDescription("``` Updated your primary color. ```"));
                    })
                    .catch(e => {
                        message.channel.send(new MessageEmbed()
                            .setColor(mdl.config.errcol)
                            .setDescription("``` Caught an error. ```"))
                    });
        }
    }
}