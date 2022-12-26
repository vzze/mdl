const { MessageEmbed } = require("discord.js-light");

module.exports = {
    name: 'name',
    aliases: ['n'],
    description: 'Changes the name of your Voice Channel.',
    usage: ['name <Query>'],
    cooldown: 3,
    premium: "Premium",
    async execute(mdl, message, args) {
        if(!args[0]) return;
        const member = await message.guild.members.fetch(message.author.id, { cache: false });
        const vc = mdl.vcowners.get(member.user.id);
        if(!vc) return;
        if(member.voice.channelID != vc) return;
        let string = "";
        args.forEach(word => string += word + " ");
        string.trim();
        const chan = await message.guild.channels.fetch(vc, { cache: false });
        const txt = mdl.linker.get(vc);
        if(txt) { 
            txt.setName(string)
                .catch(e => message.channel.send(new MessageEmbed()
                    .setColor(mdl.config.errcol)
                    .setDescription("``` Caught an error. ```")));
        }
        chan.setName(string)
            .then(() => {
                message.channel.send(new MessageEmbed()
                    .setColor(mdl.config.pcol)
                    .setDescription(`\`\`\`prolog\nChanged Name :: ${string}\n\`\`\``));
            })
            .catch(e => message.channel.send(new MessageEmbed()
                .setColor(mdl.config.errcol)
                .setDescription("``` Caught an error. ```")));
    }
}