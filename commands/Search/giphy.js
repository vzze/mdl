const { MessageEmbed } = require(`discord.js`);
const {prefix, primarycol, errcol} = require('../../config/config.json')

var giphy = require('giphy-api')();
const rand = require("../../functions/XP/getRandomXP")

module.exports = {
    name: 'giphy',
    description: 'Search GIFs on Giphy!',
    usage: `\`${prefix}giphy <Query>\``,
    cooldown: 3,
    premium: "Non-Premium",
    async execute(client, message, args) {
        if(!args[0]) return;
        let string = "";
        args.forEach(word => {
            string = string + word + " ";
        })
        giphy.search(string)
            .then(async function (res) {
                let temparr = [];
                var k = 0;
                res.data.forEach(gif => {
                temparr[k] = gif.images.original.url;
                k++;
                })
                let chosen = rand(0, temparr.length);
                let gemb = new MessageEmbed()
                    .setImage(temparr[chosen])
                    .setColor(primarycol)
                await message.channel.send(gemb);
            })
            .catch(e => {
                let errembed = new MessageEmbed()
                    .setDescription("Couldn't find any gif.")
                    .setColor(errcol)
                message.channel.send(errembed);
            })
    }
}