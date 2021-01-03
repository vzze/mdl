const { MessageEmbed } = require('discord.js')
const { prefix, primarycol, errcol } = require('../../config/config.json');

module.exports = {
    name: 'play',
    description: 'Plays a song!',
    usage: `\`${prefix}play\` <Query> \n \`${prefix}play\` <Link> \n \`${prefix}play\``,
    cooldown: 1,
    premium: "Non-Premium",
    async execute(client, message, args) {
        let memch = message.guild.member(message.author).voice.channelID;

        if(!args[0]) {
            let track = client.player.nowPlaying(message);
            if(track.title) {
                let nwpl = new MessageEmbed()
                    .addField(`Now Playing`, `[${track.author} - ${track.title}](${track.url}) | ${track.requestedBy} \n \u200B \n ${client.player.createProgressBar(message)}`)
                    .setFooter(`Length: ${track.duration} | Views: ${track.views} `)
                    .setThumbnail(track.thumbnail)
                    .setColor(primarycol)
                return message.channel.send(nwpl);
            } else {
                return;
            }
        }

        if(memch == null) {
            let notvc = new MessageEmbed()
                .setDescription('You are not connected to a voice channel.')
                .setColor(errcol)
            return message.channel.send(notvc);
        }

        if(message.guild.me.voice.channel  && message.guild.member(client.user).voice.channelID != memch) {
            let diffvc = new MessageEmbed()
                .setDescription('You are not connected to the same voice channel.')
                .setColor(errcol)
            return message.channel.send(diffvc);
        }
        
        let string = "";
        if(args[1]) {
            args.forEach(word => {
                string = string + word + " ";
            })
        } else {
            string = args[0];
        }
        await client.player.play(message, string, true);
    }
}