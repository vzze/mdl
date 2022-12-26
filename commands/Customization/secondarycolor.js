const { MessageEmbed } = require("discord.js-light");

module.exports = {
    name: 'secondarycolor',
    aliases: ['sc', 'secondaryc', 'scolor', 'scol'],
    description: 'Change the secondary color of the rank card. Only accepts HEX Values',
    usage: ['secondarycolor <Hex>', 'sc #000000', 'secondarycolor'],
    cooldown: 3,
    premium: "Non-Premium",
    async execute(mdl, message, args) {
        const u = await mdl.db.users.findOne({ user_id: message.author.id });
        if(!u) u = await mdl.db.createnewuser(message.author.id, 0, message.author.tag);
        if(!args[0]) {
            await u.updateOne({ seccolor: 0 })
                    .then(() => {
                        message.channel.send(new MessageEmbed()
                            .setColor(mdl.config.pcol)
                            .setDescription("``` Updated to default secondary color. ```"));
                    })
                    .catch(e => {
                        message.channel.send(new MessageEmbed()
                            .setColor(mdl.config.errcol)
                            .setDescription("``` Caught an error. ```"))
                    });
            await u.save();
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
            await u.updateOne({ seccolor: args[0] })
                    .then(() => {
                        message.channel.send(new MessageEmbed()
                            .setColor(mdl.config.pcol)
                            .setDescription("``` Updated your secondary color. ```"));
                    })
                    .catch(e => {
                        message.channel.send(new MessageEmbed()
                            .setColor(mdl.config.errcol)
                            .setDescription("``` Caught an error. ```"))
                    });
            await u.save();
        }
    }
}