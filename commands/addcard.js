const Discord = require(`discord.js`);
const pref = require('../config/config.json')
const deepai = require('deepai');

module.exports = {
    name: 'addcard',
    description: "Adds a custom rank card for users above level 20. \n Suggested resolution is 934x282",
    usage: `\`${pref.prefix}addcard\` <Imgur link> \n \`${pref.prefix}addcard\` <Imgur link>`,
    cooldown: 5,
    async execute(client, message, args, users, ranks, Canvas, lvls) {
        const us = await users.findOne({ user_id: message.author.id });
        if(us.level>=20) {
            if(args[0]) {
                if(args[0].indexOf("imgur")!=-1) {
                    if(args[0].indexOf(".png")!=-1 || args[0].indexOf(".jpg")!=-1 || args[0].indexOf(".jpeg")!=-1) {
                        var ok = 1;
                        deepai.setApiKey('3735ad30-254c-40d8-9b50-ce0cfb3f4707');

                        var resp = await deepai.callStandardApi("nsfw-detector", {
                                image: `${args[0]}`,
                        });
                        let nsfwcheck = resp.output.nsfw_score;
                        if(nsfwcheck >= 0.6) {
                            const nsfwdembed = new Discord.MessageEmbed()
                                .setColor('#dd4545')
                                .setDescription(`**Image is not safe for work.**`)
                            return message.channel.send(nsfwdembed);
                        }
                        try {
                            const u = await users.findOne({ user_id: message.author.id });
                            await u.updateOne({ rankcardlink: args[0] });
                            await u.save();
                        } catch (e) {
                            ok = 0;
                            const ad3dembed = new Discord.MessageEmbed()
                                .setColor('#dd4545')
                                .setDescription(`**Caught an error.**`)
                            message.channel.send(ad3dembed);
                        }
                        if(ok==1) {
                            const l3embed = new Discord.MessageEmbed()
                                .setColor('#ad26d1')
                                .setDescription(`**Successfully uploaded card background.**`)
                            message.channel.send(l3embed);  
                        } 
                    } else {
                        const ad3dembed = new Discord.MessageEmbed()
                            .setColor('#dd4545')
                            .setDescription(`**Must be the image adress.**`)
                        message.channel.send(ad3dembed);
                    }
                } else {
                    const ad3dembed = new Discord.MessageEmbed()
                        .setColor('#dd4545')
                        .setDescription(`**Must be an Imgur link.**`)
                    message.channel.send(ad3dembed);
                }
            } else {
                const addembed = new Discord.MessageEmbed()
                    .setColor('#dd4545')
                    .setDescription(`**Please provide an Imgur link.**`)
                message.channel.send(addembed);
            }
        } else {
            const add4embed = new Discord.MessageEmbed()
                    .setColor('#dd4545')
                    .setDescription(`**You must be at least level 20.**`)
            message.channel.send(add4embed);
        }
    }
}