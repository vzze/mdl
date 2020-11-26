const { DiscordAPIError } = require("discord.js")
const Discord = require(`discord.js`);
const pref = require('../config/config.json')


module.exports = {
    name: 'help',
    description: 'Lists all the commands or info about a specific command.',
    usage: `\`${pref.prefix}help\` \n \`${pref.prefix}help\` [command]`,
    cooldown: 1,
    async execute(client, message, args, users, ranks, Canvas, lvls) {
        if(args[0]) {
            if(args[0].toLowerCase()=="setup") {
                const commandhelpembed = new Discord.MessageEmbed()
                    .setColor('#ad26d1')
                    .setTitle(`Setup`)
                    .addField('Linking Roles', `\`${pref.prefix}linkrole\` <RoleID> <Position>`, false)
                    .addField('Remove Roles', `\`${pref.prefix}removelinkedrole\` <RoleID>`, false)
                message.channel.send(commandhelpembed);
                return;
            }
            const { commands } = message.client;
            const name = args[0].toLowerCase();
            const command = commands.get(name);
            if(!command) {

            } else {
                const commandhelpembed = new Discord.MessageEmbed()
                    .setColor('#ad26d1')
                    .setTitle(`Command: \`${pref.prefix}${command.name}\``)
                    .addField('Description', `${command.description}`, false)
                    .addField('Examples', `${command.usage}`, false)
                message.channel.send(commandhelpembed);
            }

        } else {
            const helpembed = new Discord.MessageEmbed()
                .setColor('#ad26d1')
                .setDescription(`A list of commands is below. Use \`${pref.prefix}help [command]\` for more detailed information on a command.`)
                .addField('Setup', '`linkrole`,`removelinkedrole` \n', false)
                .addField('General', '`help`, `leaderboard`, `level`, `global`, `addcard`, `cardavatar`, `removecard`, `invite` \n', false)
                .setFooter(`Users gain 15-25 XP for a message sent every 30 seconds || vzze`);
            message.channel.send(helpembed);
        }
    }
}