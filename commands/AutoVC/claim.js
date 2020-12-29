const { prefix } = require("../../config/config.json");
const { vccoll } = require("../../events/clientEvents/voiceStateUpdate")
const { serverlist } = require("../../events/clientEvents/ready");

module.exports = {
    name: `claim`,
    description: `Claim the ownership of the VC, if it doesn\`t have an owner.`,
    usage: `\`${prefix}claim\``,
    cooldown: 3,
    premium: "Premium",
    execute(client, message, args) {
        if(!serverlist.has(message.guild.id)) return;
        let target = message.author;
        let mem = message.guild.member(target);
        let o = vccoll.findKey(c => c.vc.id == mem.voice.channelID && c.owner == true)
        if(mem.voice.channelID == null) return;
        if(o) return;
        vccoll.set(target.id, { owner: true, vc: chan});
        let tranem = new MessageEmbed()
                .setDescription(`<@${target.id}> has claimed the VC!`)
                .setColor(primarycol)
        message.channel.send(tranem);
    }
}
