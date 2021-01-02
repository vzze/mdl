const { MessageEmbed } = require('discord.js')
const { prefix, primarycol, errcol } = require('../../config/config.json');

module.exports = {
    name: 'stop',
    description: 'Stops the music.',
    usage: `\`${prefix}stop\``,
    cooldown: 3,
    premium: "Non-Premium",
    execute(client, message, args) {
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
        client.player.stop(message);
        message.react('🛑')
    }
}