const { MessageEmbed } = require("discord.js-light");

module.exports = {
    name: 'vlock',
    aliases: ['vck', 'vlck'],
    description: 'Locks your Voice Channel.',
    usage: ['vlock'],
    cooldown: 3,
    premium: "Premium",
    async execute(mdl, message, args) {
        const member = await message.guild.members.fetch(message.author.id, { cache: false });
        const vc = mdl.vcowners.get(member.user.id);
        if(!vc) return;
        if(member.voice.channelID != vc) return;
        const chan = await message.guild.channels.fetch(vc, { cache: false });
        await chan.updateOverwrite(message.guild.roles.everyone, {
            CONNECT: false
        }).then(() => {
            message.channel.send(new MessageEmbed()
                .setDescription("``` Locked your channel. ```")
                .setColor(mdl.config.pcol));
        }).catch(e => {
            message.channel.send(new MessageEmbed()
                .setDescription("``` Caught an error. ```")
                .setColor(mdl.config.errcol));
        })
    }
}