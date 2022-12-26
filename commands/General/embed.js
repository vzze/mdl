const { MessageEmbed } = require("discord.js-light");

module.exports = {
    name: 'embed',
    aliases: ['em'],
    description: 'Make a Custom Embed. Common syntax like [click](LINK) works.',
    usage: ['embed <Text>'],
    cooldown: 2,
    premium: "Non-Premium",
    execute(mdl, message, args) {
        let big = "";
        args.forEach(w => big += w + " ");
        big.trim();
        message.channel.send(new MessageEmbed()
            .setColor(mdl.config.pcol)
            .setDescription("\u200B" + big))
    }
}