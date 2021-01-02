const { MessageEmbed } = require('discord.js');
const { set } = require('mongoose');
const { prefix, primarycol, errcol } = require('../../config/config.json');

module.exports = {
    name: 'setfilter',
    description: 'Set some nifty filters for your music. \n \u200B \n Here\'s a list of all filters: \n `bassboost`, `8D`, `vaporwave`, `nightcore`, `phaser`, `tremolo`, `vibrato`, `reverse`, `treble`, `normalizer`, `surrounding`, `pulsator`, `subboost`, `karaoke`, `flanger`, `gate`, `haas`, `mcompand`',
    usage: `${prefix}setfilter [Filter]`,
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
        if(!client.player.isPlaying(message)) {
            let notp = new MessageEmbed()
                .setDescription("There is no music being played.")
                .setColor(errcol)
            return message.channel.send(notp)
        }
        if(!args[0]) {
            let nspec = new MessageEmbed()
                .setDescription('You have to specify the filter.')
                .setColor(errcol)
            return message.channel.send(nspec);
        }
        const filterToUpdate = client.config.filters.find((f) => f.toLowerCase() === args[0].toLowerCase());

        if (!filterToUpdate) {
            let nfilter = new MessageEmbed()
                .setDescription('This filter doesn\`t exist.')
                .setColor(errcol)
            return message.channel.send(nfilter)
        }

        const filtersUpdated = {};

        filtersUpdated[filterToUpdate] = client.player.getQueue(message).filters[filterToUpdate] ? false : true;

        client.player.setFilters(message, filtersUpdated);

        if (filtersUpdated[filterToUpdate]) {
            let truef = new MessageEmbed()
                .setDescription(`Adding the \`${args[0]}\` filter.`)
                .setFooter("The longer the track is the longer it will take for the filter to be applied.")
                .setColor(primarycol)
            return message.channel.send(truef);
        } else {
            let falsef = new MessageEmbed()
                .setDescription(`Removing the ${args[0]} filter.`)
                .setFooter("The longer the track is the longer it will take for the filter to be removed.")
                .setColor(primarycol)
            return message.channel.send(falsef);
        }
    }
}