const { MessageEmbed } = require(`discord.js`);
const process = require('process');
const pref = require('../config/config.json');

module.exports = {
    name: 'stats',
    description: `Displays the stats of the bot`,
    usage: `\`${pref.prefix}stats\``,
    cooldown: 5,
    async execute(client, message, args) {
        let seconds = Math.floor(process.uptime());
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);
        let days = Math.floor(hours / 24);
        seconds %= 60;
        minutes %= 60;
        hours %= 24;

        const memoryused = Math.floor(process.memoryUsage().heapUsed / 1024 / 1024);

        const prom = await client.shard.fetchClientValues('guilds.cache.size').catch(e => console.log(e));
        const glds = prom.reduce((u, guildCount) => u + guildCount, 0);

        const statembed = new MessageEmbed()
            .setColor('#ad26d1')
            .setAuthor(`${message.client.user.tag}`, `${message.client.user.displayAvatarURL()}`)
            .addField('Memory Usage', `${memoryused} MB`, true)
            .addField('Guilds', `${glds}`, true)
            .addField('Uptime', `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`, false)
            .addField('Latency', `${client.ws.ping}ms`, true)
            .setFooter(`vzze`);
        message.channel.send(statembed);

    }
}