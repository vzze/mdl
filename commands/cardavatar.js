const { DiscordAPIError } = require("discord.js")
const Discord = require(`discord.js`);
const pref = require('../config/config.json')
const users = require('../data/users');

module.exports = {
    name: 'cardavatar',
    description: 'Choose to display or to not display your avatar on the rank card.',
    usage: `\`${pref.prefix}cardavatar\``,
    cooldown: 3,
    async execute(client, message, args) {
        const u = await users.findOne({ user_id: message.author.id });
        var ok = 1;
        if(u==undefined) {
            const newU = new users({
                user_id: message.author.id, 
                xp: 0, 
                level: 0, 
                user_name: `${message.author.tag}`,
                rankcardlink: 0,
                rankavatar: 1
            });
            newU.save();
            u = newU;
            setTimeout(() => {}, 3000);
        }
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