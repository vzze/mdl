const { MessageEmbed } = require(`discord.js`);
const {prefix, primarycol, errcol} = require('../../config/config.json')

const ud = require('urban-dictionary')

module.exports = {
    name: 'urban',
    description: 'Search word definitions on urban dictionary.',
    usage: `\`${prefix}urban <Query>\``,
    cooldown: 3,
    premium: "Non-Premium",
    async execute(client, message, args) {
        if(!args[0]) return;
        let string = "";
        args.forEach(word => {
            string = string + word + " ";
        })
        ud.term(string)
            .then((result) => {
                const entries = result.entries
                let worddef = new MessageEmbed()
                    .setTitle(entries[0].word)
                    .addField('Definition', `${entries[0].definition}`, false)
                    .addField('Examples', `${entries[0].example}`, false)
                    .setColor(primarycol)
                message.channel.send(worddef);
            })
            .catch((error) => {
                console.log(error)
                let errembed = new MessageEmbed()
                    .setDescription("Couldn't find any definition.")
                    .setColor(errcol)
                message.channel.send(errembed);
            })
    }
}