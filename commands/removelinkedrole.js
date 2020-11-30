const { DiscordAPIError } = require("discord.js")
const Discord = require(`discord.js`);
const pref = require('../config/config.json');
const { execute } = require('../index');

module.exports = {
    name: 'removelinkedrole',
    description: "Removes a linked role and deletes said role.",
    usage: `\`${pref.prefix}removelinkedrole\` <RoleID>`,
    cooldown: 2,
    async execute(client, message, args, users, ranks, Canvas, lvls) {
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
                var ok = 1;
                var query = { guild_id: message.guild.id, role_id: `${args[0]}`}
                try {
                    const r = await ranks.findOne(query);
                    if(r!=null) {
                        message.guild.roles.fetch(args[0]).then(async role => {
                            await role.delete();
                        })
                        await r.updateOne({ role_id: `0`});
                        await r.save();
                    } else {
                        const elembed = new Discord.MessageEmbed()
                            .setColor('#dd4545')
                            .setDescription(`**Chosen role is not linked in the first place.**`)
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
                        .setDescription(`**Removed role successfully.**`)
                    message.channel.send(el2embed);
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