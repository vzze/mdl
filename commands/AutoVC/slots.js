const { MessageEmbed } = require("discord.js-light");

module.exports = {
    name: 'slots',
    aliases: ['sl'],
    description: 'Changes the amount of slots your VC has.',
    usage: ['slots <0-99>'],
    cooldown: 3,
    premium: "Premium",
    async execute(mdl, message, args) {
        if(!args[0]) return;
        if(isNaN(args[0])) return;
        const member = await message.guild.members.fetch(message.author.id, { cache: false });
        const vc = mdl.vcowners.get(member.user.id);
        if(!vc) return;
        if(member.voice.channelID != vc) return;
        let string = "";
        args.forEach(word => string += word + " ");
        string.trim();
        const chan = await message.guild.channels.fetch(vc, { cache: false });
        chan.setUserLimit(args[0])
            .catch(e => message.channel.send(new MessageEmbed()
                .setColor(mdl.config.errcol)
                .setDescription("``` Caught an error. ```")));
    }
}