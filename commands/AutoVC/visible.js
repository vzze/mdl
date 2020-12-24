const { prefix } = require("../../config/config.json");
const { vccoll } = require("../../events/clientEvents/voiceStateUpdate")
const { serverlist } = require("../../events/clientEvents/ready");

module.exports = {
    name: `visible`,
    description: `Turns your VC visible.`,
    usage: `\`${prefix}visible\``,
    cooldown: 3,
    premium: "Premium",
    execute(client, message, args) {
        if(serverlist.get(message.guild.id).premium == 0) return;
        const check = vccoll.get(message.author.id);
        if(!check) return;
        if(check.owner==false) return;
        let chan = check.vc;
        chan.updateOverwrite(message.guild.id, {
            VIEW_CHANNEL: true,
        })
    }
}