const { MessageEmbed } = require("discord.js-light");

module.exports = {
    name: 'quote',
    aliases: ['q'],
    description: 'Add a custom quote to your level card',
    usage: ['quote <Query>'],
    cooldown: 3,
    premium: "Non-Premium",
    async execute(mdl, message, args) {
        if(!args[0]) {

        }
        const badwords = ['nigger', 'n1gger', 'nigg3r', 'n1gg3r', 'niggur', 'n1ggur', 'nigur', 'n1gur'];
        let string = "";
        args.forEach(w => string += w + " ");
        string.trim();
        let check = string.toLowerCase();
        for(const word of badwords) {
            if(check.indexOf(word) != -1) {
                return message.channel.send(new MessageEmbed()
                    .setColor(mdl.config.errcol)
                    .setDescription("``` No bad words. ```"));
            }
        }
        if(string.length > 255) {
            return message.channel.send(new MessageEmbed()
                .setColor(mdl.config.errcol)
                .setDescription("``` Length of quote must be under 255 characters. ```"));
        }
        const u = await mdl.db.users.findOne({ user_id: message.author.id });
        if(!u) u = await mdl.db.createnewuser(message.author.id, 0, message.author.tag);
        await u.updateOne({ quote: string })
            .then(() => {
                message.channel.send(new MessageEmbed()
                    .setDescription("``` Updated your quote. ```")
                    .setColor(mdl.config.pcol));
            })
            .catch(e => {
                message.channel.send(new MessageEmbed()
                    .setDescription("``` Caught an error. ```")
                    .setColor(mdl.config.errcol));
            })
        await u.save();
    }
}