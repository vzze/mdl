const { MessageEmbed } = require(`discord.js`);
const {prefix, primarycol, errcol} = require('../../config/config.json')

const wiki = require('wikipedia');

module.exports = {
    name: 'wiki',
    description: 'Search the whole wiki from discord!',
    usage: `\`${prefix}wiki <Query>\``,
    cooldown: 3,
    premium: "Non-Premium",
    async execute(client, message, args) {
        if(!args[0]) return;
        let string = "";
        args.forEach(word => {
            string = string + word + " ";
        })
        try {
            const page = await wiki.page(string);
            const summary = await page.summary();
            let wikiem = new MessageEmbed()
                .setTitle(page.title)
                .setURL(page.fullurl)
                .addField("Summary", `${summary.extract} \n \u200B \n For more information click on the title!`)
                .setColor(primarycol)
            message.channel.send(wikiem);
        } catch (error) {
            console.log(error)
            let errembed = new MessageEmbed()
                .setDescription("Couldn't find any page.")
                .setColor(errcol)
            message.channel.send(errembed);
        }
    }
}