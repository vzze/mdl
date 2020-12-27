const { MessageEmbed, DiscordAPIError } = require(`discord.js`);
const { prefix, primarycol, errcol } = require('../../config/config.json')
const users = require('../../data/users');

module.exports = {
    name: 'quote',
    description: 'Put a quote on your level card! \n Put the value 0 to remove it.',
    usage: `\`${prefix}quote\` hello! \n \`${prefix}quote\` 0`,
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
        let string = "";
        if(!args[0]) return;
        args.forEach(word => {
            string = string + word + " ";
        })
        if(string == '0 ') {
            try{
                await u.updateOne({ quote: "0"});
                await u.save();
            } catch(e) {
                let err = new MessageEmbed()
                    .setDescription(`Caught an error.`)
                    .setColor(errcol)
                return message.channel.send(err);
            }
            let removal = new MessageEmbed()
                .setDescription('Removed your quote.')
                .setColor(primarycol)
            return message.channel.send(removal);
        }
        if(string.length >= 255) {
            let ler = new MessageEmbed()
                .setDescription("The quote is too long!")
                .setColor(errcol)
            return message.channel.send(ler);
        }
        try{
            await u.updateOne({ quote: `${string}`});
            await u.save();
        } catch(e) {
            let err = new MessageEmbed()
                .setDescription(`Caught an error.`)
                .setColor(errcol)
            return message.channel.send(err);
        }
        let f = new MessageEmbed()
            .addField('Set quote as', `${string}`)
            .setColor(primarycol)
        message.channel.send(f);
    }
}