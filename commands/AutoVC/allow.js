const { prefix, primarycol } = require("../../config/config.json");
const { vccoll, linker } = require("../../events/clientEvents/voiceStateUpdate");
const { MessageEmbed } = require('discord.js')
const { serverlist } = require("../../events/clientEvents/ready");

module.exports = {
    name: "allow",
    description: "Allows a user/users into a VC.",
    usage: `\`${prefix}allow\` <User> \n \`${prefix}allow\` <User1> <User2>..`,
    cooldown: 3,
    premium: "Premium",
    async execute(client, message, args) {
        if(!serverlist.has(message.guild.id)) return;
        let check = vccoll.get(message.author.id);
        if(!check) return;
        if(check.owner==false) return;
        let chan = check.vc;
        if(!message.mentions.users.first()) return;
        let arr = [];
        message.mentions.users.forEach(async m => {
            try {
                arr.push(m);
                await chan.updateOverwrite(m.id, {
                    CONNECT: true,
                    VIEW_CHANNEL: true,
                })
            } catch (e) {
                arr.pop(m);
            }
        })
        let txtchan = linker.get(chan.id)
        if(txtchan) {
            let e = new MessageEmbed()
                .setColor(primarycol)
                .addField('Allowed members', 
                arr.map(t => `\`${t.tag}\``)
                    .join(", ")
                )
                txtchan.send(e);
        } else {
            let e = new MessageEmbed()
                .setColor(primarycol)
                .addField('Allowed members', 
                arr.map(t => `\`${t.tag}\``)
                    .join(", ")
                )
            message.channel.send(e);
        }
    }
}