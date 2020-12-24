const { MessageEmbed, DiscordAPIError} = require(`discord.js`);
const {prefix, primarycol, errcol} = require('../../config/config.json')
const { serverlist } = require("../../events/clientEvents/ready");

module.exports = {
    name: 'help',
    description: 'Lists all the commands or info about a specific command.',
    usage: `\`${prefix}help\` \n \`${prefix}help\` [command]`,
    cooldown: 2,
    premium: "Non-Premium",
    async execute(client, message, args) {
        const modules = client.modules.filter(m => m != "Owner");
        if(!args[0]) {
            const helpembed = new MessageEmbed()
                .setColor(primarycol)
                .setThumbnail(`${message.client.user.displayAvatarURL()}`)
                .addField('Modules', 
                    modules.map(m => `\`${m}\``)
                        .join(", ") + `\n \u200B \n \`${prefix}help [module]\` for the commands of a module.`
                )
            return message.channel.send(helpembed);
        }
        const name = args[0].toLowerCase();
        const mod = modules.get(name);
        if(!mod) {
            const cmd = client.commands.get(name);
            if(!cmd) return;
            const command = cmd.cmd;
            const commandhelpembed = new MessageEmbed()
                .setColor('#ad26d1')
                .setTitle(`Command: \`${prefix}${command.name}\``)
                .addField('Description', `${command.description}`, false)
                .addField('Examples', `${command.usage}`, false)
                .setFooter(`Cooldown: ${command.cooldown} || ${command.premium}`)
            return message.channel.send(commandhelpembed);
        }
        const modfilter = client.commands.filter(c => c.module == `${mod}`)
        const moduleembed = new MessageEmbed()
            .setColor(primarycol)
            .addField(`${mod}`, 
                modfilter.map(c => `\`${c.cmd.name}\``)
                    .join(", ")
            )
        message.channel.send(moduleembed);

    }
}