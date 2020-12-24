const { vccoll, linker } = require("../../events/clientEvents/voiceStateUpdate");
const { prefix, primarycol, errcol } = require("../../config/config.json");
const { MessageEmbed } = require("discord.js");
const { serverlist } = require("../../events/clientEvents/ready");

module.exports = {
    name: "transfer",
    description: "Transfers the ownership.",
    usage: `\`${prefix} transfer\` <User>`,
    cooldown: 3,
    premium: "Premium",
    async execute(client, message, args) {
        if(serverlist.get(message.guild.id).premium == 0) return;
        let check = vccoll.get(message.author.id);
        if(!check) return;
        if(check.owner==false) return;
        let target = message.mentions.users.first();
        let chan = check.vc;
        const member = message.guild.member(target);
        let txtchan = linker.get(chan.id)
        if(member.voice.channelID != chan.id) {
            if(txtchan) {
                let no = new MessageEmbed()
                    .setDescription(`<@${target.id}> is not in your voice channel.`)
                    .setColor(errcol)
                return txtchan.send(no);
            } else {
                let no = new MessageEmbed()
                    .setDescription(`<@${target.id}> is not in your voice channel.`)
                    .setColor(errcol)
                return message.channel.send(no);
            }
            
        }
        vccoll.set(target.id, {owner: true, vc: chan});
        vccoll.set(message.author.id, { owner: false, vc: chan});
        if(txtchan) {
            let tranem = new MessageEmbed()
                .setDescription(`Ownership transferred to <@${target.id}>`)
                .setColor(primarycol)
            txtchan.send(tranem);
        } else {
            let tranem = new MessageEmbed()
                .setDescription(`Ownership transferred to <@${target.id}>`)
                .setColor(primarycol)
            message.channel.send(tranem);
        }
        
        
    }
}