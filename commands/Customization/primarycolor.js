const { MessageEmbed, DiscordAPIError } = require(`discord.js`);
const { prefix, primarycol, errcol } = require('../../config/config.json')
const users = require('../../data/users');

module.exports = {
    name: 'primarycolor',
    description: 'Changes the primary color of your level card. \n Put the value to 0 to remove it. \n Here\'s a [colour picker](https://www.google.com/search?q=color+picker)!',
    usage: `\`${prefix}primarycolor\` #696969 \n \`${prefix}primarycolor\` 0`,
    cooldown: 3,
    premium: "Non-Premium",
    async execute(client, message, args) {
        let u = await users.findOne({ user_id: message.author.id });
        if(u==undefined) {
            const newU = new users({
                user_id: message.author.id, 
                xp: 0, 
                level: 0, 
                user_name: `${message.author.tag}`,
                rankcardlink: 0,
                rankavatar: 1,
                prcolor: "0",
                seccolor: "0",
                quote: "0"
            });
            newU.save();
            u = newU;
            setTimeout(() => {}, 3000);
        }

        if(!args[0]) return;
        if(args[0] == 0) {
            try{
                await u.updateOne({ prcolor: `0`});
                await u.save();
            } catch(e) {
                let err = new MessageEmbed()
                    .setDescription(`Caught an error.`)
                    .setColor(errcol)
                return message.channel.send(err);
            }
            let removal = new MessageEmbed()
                .setDescription('Removed your primary color.')
                .setColor(primarycol)
            return message.channel.send(removal);
        }
        let string = args[0];
        if(string.length != 7 || string.indexOf("#") == -1 || string.indexOf("#") != 0) {
            let ler = new MessageEmbed()
                .setDescription("Must be a HEX value.")
                .setColor(errcol)
            return message.channel.send(ler);
        }
        try{
            await u.updateOne({ prcolor: `${string}`});
            await u.save();
        } catch(e) {
            let err = new MessageEmbed()
                .setDescription(`Caught an error.`)
                .setColor(errcol)
            return message.channel.send(err);
        }
        let f = new MessageEmbed()
            .setDescription(`Set primary color as \`${string}\``)
            .setColor(string)
        message.channel.send(f);
    }
}