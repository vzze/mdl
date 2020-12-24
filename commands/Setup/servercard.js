const { serverlist } = require("../../events/clientEvents/ready");
const servers = require("../../data/servers");
const { MessageEmbed } = require(`discord.js`);
const {prefix, errcol, primarycol} = require('../../config/config.json');
const deepai = require('deepai');

module.exports = {
    name: 'servercard',
    description: 'Sets up the servers custom rank card! Put the value 0 to remove it.',
    usage: `\`${prefix}servercard\` <ImgurLink> \n \`${prefix}servercard\` 0`,
    cooldown: 5,
    premium: "Premium",
    async execute(client, message, args) {
        if(serverlist.get(message.guild.id).premium == 0) return;
        const target = message.author;
        const member = message.guild.member(target);
        if(!member.hasPermission("MANAGE_GUILD")) {
            const authnoperm = new MessageEmbed()
                .setColor(errcol)
                .setDescription("You don\` have the required permissions.");
            return message.channel.send(authnoperm);
        }
        if(!args[0]) {
            let r = new MessageEmbed()
                .setDescription('You need to mention the Imgur Link')
                .setColor(errcol);
            return message.channel.send(r);
        }
        if(args[0] == '0') {
            let g = await servers.findOne({guild_id: message.guild.id});
            await g.updateOne({defaultlevelimage: `${args[0]}`});
            await g.save();
            let ok = new MessageEmbed()
                .setDescription("Removed your server card banner.")
                .setColor(primarycol)
            message.channel.send(ok);
            serverlist.set(message.guild.id, {premium: g.premium, parent: g.autovcparent, mainvc: g.autovcchannel, whitelist: g.whitelisterolevc, defaultlevelimage: `${args[0]}`});
            return;
        }
        if(args[0].indexOf("imgur")!=-1) {
            if(args[0].indexOf(".png")!=-1 || args[0].indexOf(".jpg")!=-1 || args[0].indexOf(".jpeg")!=-1) {
                deepai.setApiKey('3735ad30-254c-40d8-9b50-ce0cfb3f4707');
                var resp = await deepai.callStandardApi("nsfw-detector", {
                        image: `${args[0]}`,
                });
                let nsfwcheck = resp.output.nsfw_score;
                if(nsfwcheck >= 0.6) {
                    const nsfwdembed = new MessageEmbed()
                        .setColor(errcol)
                        .setDescription(`**Image is not safe for work.**`)
                    return message.channel.send(nsfwdembed);
                }
            } else {
                let r = new MessageEmbed()
                .setDescription('Must be the image adress.')
                .setColor(errcol);
            return message.channel.send(r);
            }
        } else {
            let r = new MessageEmbed()
                .setDescription('Must be an Imgur Link.')
                .setColor(errcol);
            return message.channel.send(r);
        }
        let g = await servers.findOne({guild_id: message.guild.id});
        await g.updateOne({defaultlevelimage: `${args[0]}`});
        await g.save();
        let ok = new MessageEmbed()
            .setDescription("Uploaded server card banner!")
            .setColor(primarycol)
        message.channel.send(ok);
        serverlist.set(message.guild.id, {premium: g.premium, parent: g.autovcparent, mainvc: g.autovcchannel, whitelist: g.whitelisterolevc, defaultlevelimage: `${args[0]}`});
    }
}