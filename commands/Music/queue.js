const { MessageEmbed } = require('discord.js')
const { prefix, primarycol, errcol } = require('../../config/config.json');

module.exports = {
    name: 'queue',
    description: 'Displays the queue of the server.',
    usage: `${prefix}queue`,
    cooldown: 3,
    premium: "Non-Premium",
    execute(client, message, args) {
        function stringer(st, dur) {
            if(st.length >= 60) {
                st = st.slice(0, 60);
                st = st + '...'
            }
            for(var i = 1; i <= 65 - st.length; i++) {
                dur = " " + dur;
            }
            return st + dur;
        }
        let b = client.player.getQueue(message)
        if(b) {
            if(b.tracks.slice(10).length != 0) {
                message.channel.send(
                    `${b.tracks.slice(0, 10).map((t, i) => `${stringer(`${i+1}. ${t.author} - ${t.title}`, t.duration)}`)
                    .join('\n')} \nAnd ${b.tracks.slice(10).length} more tracks remaining`,
                    {code: 'apache'}
                )
            } else {
                message.channel.send(
                    `${b.tracks.slice(0, 10).map((t, i) => `${stringer(`${i+1}. ${t.author} - ${t.title}`, t.duration)}`)
                    .join('\n')}`,
                    {code: 'apache'}
                )
            }
        } else {
            let noq = new MessageEmbed()
                .setDescription('There are no songs being played in this server.')
                .setColor(errcol)
            message.channel.send(noq);
        }
    }
}