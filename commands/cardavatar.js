const { DiscordAPIError } = require("discord.js")
const Discord = require(`discord.js`);
const pref = require('../config/config.json')

module.exports = {
    name: 'cardavatar',
    description: 'Choose to display or to not display your avatar on the rank card.',
    usage: `${pref.prefix}cardavatar`,
    cooldown: 3,
    async execute(client, message, args, users, ranks, Canvas, lvls) {
        const u = await users.findOne({ user_id: message.author.id });
        var ok = 1;
        switch(u.rankavatar) {
            case 1:
                try {
                    await u.updateOne({ rankavatar: 0 })
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
                        .setDescription(`**Successfully updated your card avatar to invisible.**`)
                    message.channel.send(l3embed); 
                }
            break;
            case 0:
                try {
                    await u.updateOne({ rankavatar: 1 })
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
                        .setDescription(`**Successfully updated your card avatar to visible.**`)
                    message.channel.send(l3embed); 
                }
            break;
        }
    }
}