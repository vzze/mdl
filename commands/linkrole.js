const { DiscordAPIError } = require("discord.js")
const Discord = require(`discord.js`);
const pref = require('../config/config.json');
const ranks = require("../data/ranks");

module.exports = {
    name: 'linkrole',
    description: "Links a role.",
    usage: `\`${pref.prefix}linkrole\` <RoleID> <Level> \n \`${pref.prefix}linkrole\` 774601811428114432 5`,
    cooldown: 2,
    async execute(client, message, args) {
        if(!message.guild.member(client.user.id).hasPermission("MANAGE_ROLES")) {
            const noelembed = new Discord.MessageEmbed()
                .setColor('#dd4545')
                .setDescription(`**I don\'t have permissions to manage roles.**`)
            return message.channel.send(noelembed);
        }
        const target = message.author;
        const member = message.guild.member(target);
        if(member.hasPermission("MANAGE_ROLES")) {
            if(args[0]) {
                if(args[1]) {
                    if(!isNaN(args[1]) && args[1] >= 1 && args[1] <= 100) {
                        var ok = 1;
                        try {
                            let roleadd  = await message.guild.roles.cache.get(`${args[0]}`);
                            if(roleadd) {
                                const newLinkedRole = new ranks({
                                    guild_id: `${message.guild.id}`,
                                    rank_id: args[1],
                                    role_id: `${args[0]}`
                                });
                                newLinkedRole.save();
                            } else {
                                const elembed = new Discord.MessageEmbed()
                                    .setColor('#dd4545')
                                    .setDescription(`**Role does not exist.**`)
                                message.channel.send(elembed);
                                ok = 0;
                            }
                        } catch (e) {
                            const elembed = new Discord.MessageEmbed()
                                .setColor('#dd4545')
                                .setDescription(`**Caught an error.**`)
                            message.channel.send(elembed);
                            ok = 0;
                       }
  
                        if(ok==1) {
                            const el2embed = new Discord.MessageEmbed()
                                .setColor('#ad26d1')
                                .setDescription(`**Linked role successfully.**`)
                            message.channel.send(el2embed);
                        }
                    } else {
                        const el5embed = new Discord.MessageEmbed()
                            .setColor('#dd4545')
                            .setDescription(`**Must be a number and must be inbetween 1-100.**`)
                        message.channel.send(el5embed);
                    }
                } else {
                    const el4embed = new Discord.MessageEmbed()
                        .setColor('#dd4545')
                        .setDescription(`**Must mention the position (level) for the role.**`)
                    message.channel.send(el4embed);
                }
            } else {
                const el3embed = new Discord.MessageEmbed()
                    .setColor('#dd4545')
                    .setDescription(`**Must mention the role ID.**`)
                message.channel.send(el3embed);
            }
        } else {
            const el3embed = new Discord.MessageEmbed()
                .setColor('#dd4545')
                .setDescription(`**You must be able to manage roles.**`)
            message.channel.send(el3embed);
        }
    }
}