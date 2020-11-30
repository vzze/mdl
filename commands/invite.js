const Discord = require(`discord.js`);
const config = require('../config/config.json')
const pref = config.prefix;

module.exports = {
    name: 'invite',
    description: 'Sends a message with a hyper link to invite the bot.',
    usage: `\`${pref}invite\``,
    cooldown: 1,
    async execute(client, message, args, users, ranks, Canvas, lvls) {
        const l4embed = new Discord.MessageEmbed()
            .setColor('#ad26d1')
            .setAuthor(`Server Invite`, `${message.client.user.displayAvatarURL()}`)
            .setDescription(`To Invite me to your server [click here](https://discord.com/api/oauth2/authorize?client_id=776551374380204033&permissions=268520448&scope=bot).`)
        message.channel.send(l4embed);
    }
}