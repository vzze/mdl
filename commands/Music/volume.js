const { MessageEmbed } = require('discord.js')
const { prefix, primarycol, errcol } = require('../../config/config.json');

module.exports = {
    name: 'volume',
    description: 'Adjusts the volume of the bot.',
    usage: `\`${prefix}volume 1-100\``,
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
        if(isNaN(args[0])) {
            let nn = new MessageEmbed()
                .setDescription('Must be a number.')
                .setColor(errcol)
            return message.channel.send(nn);
        }
        args[0] = Math.floor(args[0]);
        if(args[0] < 1 || args[0] > 100) {
            let inter = new MessageEmbed()
                .setDescription('The number must be inbetween 1 and 100.')
                .setColor(errcol)
            return message.channel.send(inter);
        }
        client.player.setVolume(message, args[0]);
        let adjvol = new MessageEmbed()
            .setDescription(`Volume set to ${args[0]}`)
            .setColor(primarycol)
        message.channel.send(adjvol);
    }
}