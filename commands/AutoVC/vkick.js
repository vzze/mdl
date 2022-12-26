const { MessageEmbed } = require("discord.js-light");

module.exports = {
    name: 'vkick',
    aliases: ['vk'],
    description: 'Kicks someone from your Voice Channel.',
    usage: ['vkick <User>'],
    cooldown: 3,
    premium: "Premium",
    async execute(mdl, message, args) {
        const member = await message.guild.members.fetch(message.author.id, { cache: false });
        const vc = mdl.vcowners.get(member.user.id);
        if(!vc) return;
        if(member.voice.channelID != vc) return;
        const kick = await message.guild.members.fetch(message.mentions.users.first().id, { cache: false });
        if(kick.voice.channelID == vc) kick.voice.setChannel(null);
        message.channel.send(new MessageEmbed()
            .setDescription(`\`\`\`prolog\nKicked :: ${kick.user.tag}\n\`\`\``)
            .setColor(mdl.config.pcol));
    }
}