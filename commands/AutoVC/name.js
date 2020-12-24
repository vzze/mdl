const { MessageEmbed } = require("discord.js")
const { prefix, errcol } = require("../../config/config.json");
const { vccoll, linker } = require("../../events/clientEvents/voiceStateUpdate")
const { serverlist } = require("../../events/clientEvents/ready");

module.exports = {
    name: `name`,
    description: `Changes the name of your VC.`,
    usage: `\`${prefix}name\``,
    cooldown: 10,
    premium: "Premium",
    async execute(client, message, args) {
        if(serverlist.get(message.guild.id).premium == 0) return;
        if(!args[0]) return;
        let check = await vccoll.get(message.author.id);
        if(!check) return;
        if(check.owner==false) return;
        let chan = check.vc;
        let txtchan = linker.get(chan.id);
        let string = "";
        args.forEach(word => {
            string = string + word + " ";
        })
        try {
        await chan.edit({ name: string})
        if(txtchan) await txtchan.edit({ name: string})
        } catch (e) {
            let errem = new MessageEmbed()
                .setDescription("Encountered an error while trying to rename.")
                .setColor(errcol)
            txtchan.send(errem);
        }
    }
}