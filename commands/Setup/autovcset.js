const { serverlist } = require("../../events/clientEvents/ready");
const servers = require("../../data/servers");
const { MessageEmbed } = require(`discord.js`);
const {prefix, errcol, primarycol} = require('../../config/config.json');

module.exports = {
    name: 'autovcset',
    description: 'Sets up the servers Auto VC System!',
    usage: `\`${prefix}autovcset\` <VoiceChannelID>`,
    cooldown: 5,
    premium: "Premium",
    async execute(client, message, args) {
        if(serverlist.get(message.guild.id).premium == 0) return;
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

        if(!message.guild.member(client.user.id).hasPermission("MANAGE_CHANNELS")) {
            const noelembed = new MessageEmbed()
                .setColor(errcol)
                .setDescription(`I don\'t have the required permissions.`)
            return message.channel.send(noelembed);
        }

        if(!args[0]) {
            let r = new MessageEmbed()
                .setDescription('You need to mention the voice channel ID.')
                .setColor(errcol);
            return message.channel.send(r);
        }
        let ch = message.guild.channels.cache.find(r => r.id == args[0]);
        if(!ch) {
            let nr = new MessageEmbed()
                .setDescription("The channel doesn\`t exist.")
                .setColor(errcol);
            return message.channel.send(nr);
        }
        if(ch.type != 'voice') {
            let tx = new MessageEmbed()
                .setDescription("The channel must be a Voice Channel.")
                .setColor(errcol);
            return message.channel.send(tx);
        }
        let g = await servers.findOne({guild_id: message.guild.id});
        await g.updateOne({autovcparent: `${ch.parentID}`, autovcchannel: `${ch.id}`});
        await g.save();
        serverlist.set(message.guild.id, {premium: g.premium, parent: `${ch.parentId}`, mainvc: `${ch.id}`, whitelist: g.whitelisterolevc, defaultlevelimage: g.defaultlevelimage});
        let succe = new MessageEmbed()
            .setDescription(`Set main VC as \`${ch.name}\``)
            .setColor(primarycol);
        message.channel.send(succe);
    }

}