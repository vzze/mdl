const { MessageEmbed } = require("discord.js-light");

module.exports = {
    name: 'transfer',
    aliases: ['tran'],
    description: 'Transfers the ownership to someone else.',
    usage: ['transfer <User>'],
    cooldown: 3,
    premium: "Premium",
    async execute(mdl, message, args) {
        const vc = mdl.vcowners.get(message.author.id);
        if(!vc) return;
        if(!message.mentions.users.first()) return;
        const member = await message.guild.members.fetch(message.mentions.users.first().id, { cache: false });
        if(vc != member.voice.channelID) return;
        mdl.vcowners.set(member.user.id, member.voice.channelID);
        mdl.vcowners.delete(message.author.id);
        message.channel.send(new MessageEmbed()
            .setColor(mdl.config.pcol)
            .setDescription(`\`\`\`prolog\nOwnership Transferred\nU :: ${message.mentions.users.first().tag} \`\`\``))
    }
}