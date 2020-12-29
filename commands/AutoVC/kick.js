const { prefix } = require("../../config/config.json");
const { vccoll } = require("../../events/clientEvents/voiceStateUpdate")
const { serverlist } = require("../../events/clientEvents/ready");

module.exports = {
    name: `kick`,
    description: `Kicks a user from your VC.`,
    usage: `\`${prefix}kick <User>\``,
    cooldown: 3,
    premium: "Premium",
    execute(client, message, args) {
        if(!serverlist.has(message.guild.id)) return;
        let check = vccoll.get(message.author.id);
        if(!check) return;
        if(check.owner==false) return;
        let chan = check.vc;
        const target = message.mentions.users.first();
        if(!target) return;
        const member = message.guild.member(target);
        if(member.voice.channelID == chan.id) {
            member.voice.setChannel(null)
        }
    }
}