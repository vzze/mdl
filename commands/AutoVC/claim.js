const { MessageEmbed } = require("discord.js-light");

module.exports = {
    name: 'claim',
    aliases: ['cl'],
    description: 'Claim a Voice Channel that has no Owner.',
    usage: ['claim'],
    cooldown: 3,
    premium: "Premium",
    async execute(mdl, message, args) {
        const member = await message.guild.members.fetch(message.author.id, { cache: false });
        if(member.voice.channelID == null) return;
        const check = mdl.vcowners.findKey(v => v == member.voice.channelID);
        if(check) return;
        mdl.vcowners.set(member.user.id, member.voice.channelID);
        message.channel.send(new MessageEmbed()
            .setDescription(`\`\`\` ${message.author.tag} has claimed the VC. \`\`\``)
            .setColor(mdl.config.pcol));
    }
}