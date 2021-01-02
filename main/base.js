const fs = require("fs");
const mongoose = require('mongoose');
const { Client, Collection, MessageEmbed } = require('discord.js');
const { Player } = require('discord-player');
const { primarycol, errcol } = require('../config/config.json');

class MDL extends Client {
    constructor(options) {
        super(options)

        this.commands = new Collection();
        this.modules = new Collection();

        this.config = require('../config/config.json');

        this.player = new Player(this, {
            leaveOnEnd: true,
            leaveOnEndCooldown: 120000,
            leaveOnStop: false,
            leaveOnEmpty: true,
            autoSelfDeaf: true,
        })

        this.player
        .on('trackStart', (message, track) => {
            let nwpl = new MessageEmbed()
                .addField(`Now Playing`, `[${track.author} - ${track.title}](${track.url}) | ${track.requestedBy}`)
                .setFooter(`Length: ${track.duration} | Views: ${track.views} `)
                .setThumbnail(track.thumbnail)
                .setColor(primarycol)
            message.channel.send(nwpl);
        })
        .on('trackAdd', (message, queue, track) => {
            let tracka = new MessageEmbed()
                .addField(`Has been added to the queue.`, `[${track.author} - ${track.title}](${track.url}) | ${track.requestedBy}`)
                .setFooter(`Length: ${track.duration} | Views: ${track.views} `)
                .setThumbnail(track.thumbnail)
                .setColor(primarycol)
            message.channel.send(tracka);
        })
        .on('playlistAdd', (message, queue, playlist) => {
            let pla = new MessageEmbed()
                .setDescription(`\`${playlist.title}\``)
                .addField(`\u200B`, `\`${playlist.items.length}\` Songs`, false)
                .setFooter(`Has been added to the queue`)
                .setColor(primarycol)
            message.channel.send(pla)
        })
        .on('searchResults', (message, query, tracks) => {
            const embed = new MessageEmbed()
                .setAuthor(`Here are your search results for ${query}!`)
                .setDescription(tracks.map((t, i) => `${i+1}. \`${t.title}\``))
                .setFooter('Send the number of the song you want to play!')
                .setColor(primarycol)
            message.channel.send(embed);
        })
        .on('searchInvalidResponse', (message, query, tracks, content, collector) => {
            let invres = new MessageEmbed()
                .setDescription(`You must send a valid number between 1 and ${tracks.length}!`)
                .setColor(errcol)
            message.channel.send(invres);
        })
        .on('searchCancel', (message, query, tracks) => {
            let scancel = new MessageEmbed()
                .setDescription('You did not provide a valid response, please use the command again.')
                .setColor(errcol)
            message.channel.send(scancel);
        })
        .on('noResults', (message, query) => { 
            let nores = new MessageEmbed()
                .setDescription(`No results found on YouTube for \`${query}\`.`)
                .setColor(errcol)
            message.channel.send(nores);
        })

        .on('error', (error, message) => {
            switch(error){
                case 'NotPlaying':
                    let notplay = new MessageEmbed()
                        .setDescription("There is no music being played on this server.")
                        .setColor(errcol)
                    message.channel.send(notplay)
                    break;
                case 'UnableToJoin':
                    let noperm = new MessageEmbed()
                        .setDescription('I am unable to join please check my permissions.')
                        .setColor(errcol)
                    message.channel.send(noperm);
                    break;
                default:
                    console.log(error);
            }
        })

    }
    loadCommands() {
        for(const dir of fs.readdirSync("./commands/")) {
            for(const cmd of fs.readdirSync(`./commands/${dir}/`).filter(cmd => cmd.endsWith('.js'))) {
                const command = require(`../commands/${dir}/${cmd}`);
                this.commands.set(command.name, { cmd: command, module: dir });
            }
            this.modules.set(dir.toLowerCase(), dir);
            if(this.shard.ids[0] === 0) console.log(`Loaded ${dir} module`)
        }
    }
    loadEvents() {
        for(const f of fs.readdirSync('./events/clientEvents').filter(file => file.endsWith('.js'))) {
            const ev = require(`../events/clientEvents/${f}`);
            const event = ev.run;
            const eventN = f.split(".").shift();
            this.on(eventN, event.bind(null, this));
        }
        if(this.shard.ids[0] === 0) console.log(`Loaded events`)
    }
    loadDatabase() {
        mongoose.connect(`mongodb+srv://${this.config.cluseruser}:${this.config.clusterpass}@cluster.8lzpu.mongodb.net/database?retryWrites=true&w=majority`, 
            {useNewUrlParser: true, useUnifiedTopology: true, autoIndex: false}  
        );

        const db = mongoose.connection;
        
        db.on('error', console.error.bind(console, 'Connection error:'));
        db.on('open', () => {
            if(this.shard.ids[0] === 0) {
                console.log(`Connected to MongoDB as ${this.config.cluseruser}`);
            }
        });
    }
}

module.exports = MDL;