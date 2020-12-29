const { prefix } = require("../../config/config.json");
const { vccoll } = require("../../events/clientEvents/voiceStateUpdate")
const { serverlist } = require("../../events/clientEvents/ready");

module.exports = {
    name: `invisible`,
    description: `Turns your VC invisible.`,
    usage: `\`${prefix}invisible\``,
    cooldown: 3,
    premium: "Premium",
    execute(client, message, args) {
        if(!serverlist.has(message.guild.id)) return;
        let check = vccoll.get(message.author.id);
        if(!check) return;
        if(check.owner==false) return;
        let chan = check.vc;
        chan.updateOverwrite(message.guild.id, {
            VIEW_CHANNEL: false,
        })
    }
}