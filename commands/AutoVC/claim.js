const { prefix } = require("../../config/config.json");
const { vccoll } = require("../../events/clientEvents/voiceStateUpdate")
const { serverlist } = require("../../events/clientEvents/ready");
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: `claim`,
    description: `Claim the ownership of the VC, if it doesn\`t have an owner.`,
    usage: `\`${prefix}claim\``,
    cooldown: 3,
    premium: "Premium",
    execute(client, message, args) {
        if(!serverlist.has(message.guild.id)) return;
        let sv = serverlist.get(message.guild.id);
        let target = message.author;
        let mem = message.guild.member(target);
        if(mem.voice.channelID == null) return;
        if(mem.voice.channel.parentID != sv.parent) return;
        let o = vccoll.findKey(c => c.vc.id == mem.voice.channelID && c.owner == true)
        if(o) return;
        vccoll.set(target.id, { owner: true, vc: mem.voice.channel});
        let tranem = new MessageEmbed()
                .setDescription(`<@${target.id}> has claimed the VC!`)
                .setColor(primarycol)
        message.channel.send(tranem);
    }
}
