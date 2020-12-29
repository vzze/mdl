const { serverlist } = require("../../events/clientEvents/ready");
const servers = require("../../data/servers");
const { MessageEmbed } = require(`discord.js`);
const {prefix, errcol, primarycol} = require('../../config/config.json');

module.exports = {
    name: 'whitelistrole',
    description: 'Whitelists a role for the AutoVC system \n Makes a mods job way easier!',
    usage: `\`${prefix}whitelistrole\` <RoleID>`,
    cooldown: 5,
    premium: "Premium",
    async execute(client, message, args) {
        if(!serverlist.has(message.guild.id)) return;
        const target = message.author;
        const member = message.guild.member(target);
        if(!member.hasPermission("MANAGE_GUILD")) {
            const authnoperm = new MessageEmbed()
                .setColor(errcol)
                .setDescription("You don\` have the required permissions.");
            return message.channel.send(authnoperm);
        }

        if(!message.guild.member(client.user.id).hasPermission("MANAGE_GUILD")) {
            const noelembed = new MessageEmbed()
                .setColor(errcol)
                .setDescription(`I don\'t have the required permissions.`)
            return message.channel.send(noelembed);
        }

        if(!args[0]) {
            let r = new MessageEmbed()
                .setDescription('You have to mention the role ID.')
                .setColor(errcol);
            return message.channel.send(r);
        }
        let r = message.guild.roles.cache.find(r => r.id == args[0]);
        if(!r) {
            let nr = new MessageEmbed()
                .setDescription("The role doesn\`t exist.")
                .setColor(errcol);
            return message.channel.send(nr);
        }
        let g = await servers.findOne({guild_id: message.guild.id});
        await g.updateOne({whitelisterolevc: `${args[0]}`});
        await g.save();
        serverlist.set(message.guild.id, {parent: g.autovcparent, mainvc: g.autovcchannel, whitelist: args[0], defaultlevelimage: g.defaultlevelimage});
        let succe = new MessageEmbed()
            .setDescription(`Set whitelisted role as \`${r.name}\``)
            .setColor(primarycol);
        message.channel.send(succe);
    }
}