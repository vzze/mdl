const { baseModelName } = require("../../data/ranks");
const { execute } = require("../General/help");

const { prefix } = require("../../config/config.json");
const { vccoll } = require("../../events/clientEvents/voiceStateUpdate")
const { serverlist } = require("../../events/clientEvents/ready");

module.exports = {
    name: `ban`,
    description: `Bans a user from your VC.`,
    usage: `\`${prefix}ban <User>\``,
    cooldown: 3,
    premium: "Premium",
    execute(client, message, args) {
        if(serverlist.get(message.guild.id).premium == 0) return;
        let check = vccoll.get(message.author.id);
        if(!check) return;
        if(check.owner==false) return;
        let chan = check.vc;
        const target = message.mentions.users.first();
        if(!target) return;
        const member = message.guild.member(target);
        chan.updateOverwrite(member, {
            CONNECT: false,
        })
        if(member.voice.channelID == chan.id) {
            member.voice.setChannel(null)
        }
        
    }
}