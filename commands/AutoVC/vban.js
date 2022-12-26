const { MessageEmbed } = require("discord.js-light");

module.exports = {
    name: 'vban',
    aliases: ['vb'],
    description: 'Bans someone from your Voice Channel.',
    usage: ['vban <User>'],
    cooldown: 3,
    premium: "Premium",
    async execute(mdl, message, args) {
        const member = await message.guild.members.fetch(message.author.id, { cache: false });
        const vc = mdl.vcowners.get(member.user.id);
        if(!vc) return;
        if(member.voice.channelID != vc) return;
        const kick = await message.guild.members.fetch(message.mentions.users.first().id, { cache: false });
        const chan = await message.guild.channels.fetch(vc, { cache: false });
        await chan.updateOverwrite(message.mentions.users.first(), {
            CONNECT: false
        }).catch(e => {
            return message.channel.send(new MessageEmbed()
                .setDescription("``` Caught an error. ```")
                .setColor(mdl.config.errcol));
        })
        if(kick.voice.channelID == vc) kick.voice.setChannel(null);
        message.channel.send(new MessageEmbed()
            .setDescription(`\`\`\`prolog\nBanned :: ${kick.user.tag}\n\`\`\``)
            .setColor(mdl.config.pcol));
    }
}