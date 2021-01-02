const { MessageEmbed } = require('discord.js')
const { prefix, primarycol, errcol } = require('../../config/config.json');

module.exports = {
    name: 'loop',
    description: 'Loops a song or the whole queue.',
    usage: `\`${prefix}loop\ \`${prefix}loop queue\``,
    cooldown: 3,
    premium: 'Non-Premium',
    async execute(client, message, args) {
        let memch = message.guild.member(message.author).voice.channelID;

        if(memch == null) {
            let notvc = new MessageEmbed()
                .setDescription('You are not connected to a voice channel.')
                .setColor(errcol)
            return message.channel.send(notvc);
        }

        if(client.player.isPlaying(message)) {
            if(message.guild.member(client.user).voice.channelID != memch) {
                let diffvc = new MessageEmbed()
                    .setDescription('You are not connected to the same voice channel.')
                    .setColor(errcol)
                return message.channel.send(diffvc);
            }
        }
        if (args[0] == 'queue') {
            if (client.player.getQueue(message).loopMode) {
                client.player.setLoopMode(message, false);
                let qnrep = new MessageEmbed()
                    .setDescription('Queue looping disabled.')
                    .setColor(primarycol)
                return message.channel.send(qnrep)
            } else {
                client.player.setLoopMode(message, true);
                let qrep = new MessageEmbed()
                    .setDescription('Queue looping enabled.')
                    .setColor(primarycol)
                return message.channel.send(qrep);
            }
        } else {
            if (client.player.getQueue(message).repeatMode) {
                client.player.setRepeatMode(message, false);
                let snrep = new MessageEmbed()
                    .setDescription(`Looping for current track disabled.`)
                    .setColor(primarycol)
                return message.channel.send(snrep)
            } else {
                client.player.setRepeatMode(message, true);
                let srep = new MessageEmbed()
                    .setDescription('Looping current track.')
                    .setColor(primarycol)
                return message.channel.send(srep);
            }
        }
        
    }
}