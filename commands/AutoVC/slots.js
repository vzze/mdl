const { MessageEmbed } = require("discord.js")
const { prefix, errcol } = require("../../config/config.json");
const { vccoll, linker } = require("../../events/clientEvents/voiceStateUpdate")
const { serverlist } = require("../../events/clientEvents/ready");

module.exports = {
    name: `slots`,
    description: `Changes the slots of your VC.`,
    usage: `\`${prefix}slots\``,
    cooldown: 3,
    premium: "Premium",
    async execute(client, message, args) {
        if(serverlist.get(message.guild.id).premium == 0) return;
        if(!args[0]) return;
        if(isNaN(args[0])) return;
        let check = await vccoll.get(message.author.id);
        if(!check) return;
        if(check.owner==false) return;
        let chan = check.vc;
        let txtchan = linker.get(chan.id);
        try {
        await chan.setUserLimit(args[0])
        } catch (e) {
            let errem = new MessageEmbed()
                .setDescription("Encountered an error while trying to change the slots.")
                .setColor(errcol)
            if(txtchan) txtchan.send(errem);
        }
    }
}