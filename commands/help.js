const { MessageEmbed, DiscordAPIError} = require(`discord.js`);
const pref = require('../config/config.json')


module.exports = {
    name: 'help',
    description: 'Lists all the commands or info about a specific command.',
    usage: `\`${pref.prefix}help\` \n \`${pref.prefix}help\` [command]`,
    cooldown: 3,
    async execute(client, message, args) {
        if(args[0]) {
            if(args[0].toLowerCase()=="setup") {
                const commandhelpembed = new MessageEmbed()
                    .setColor('#ad26d1')
                    .setTitle(`Setup`)
                    .addField('Linking Roles', `\`${pref.prefix}linkrole\` <RoleID> <Position>`, false)
                    .addField('Remove Roles', `\`${pref.prefix}removelinkedrole\` <RoleID>`, false)
                    .addField('Important', 'Please do mind that the bot has to be above the level roles.', false)
                message.channel.send(commandhelpembed);
                return;
            }
            const { commands } = message.client;
            const name = args[0].toLowerCase();
            const command = commands.get(name);
            if(!command) {

            } else {
                const commandhelpembed = new MessageEmbed()
                    .setColor('#ad26d1')
                    .setTitle(`Command: \`${pref.prefix}${command.name}\``)
                    .addField('Description', `${command.description}`, false)
                    .addField('Examples', `${command.usage}`, false)
                message.channel.send(commandhelpembed);
            }

        } else {
            const helpembed = new MessageEmbed()
                .setColor('#ad26d1')
                .setAuthor(`${message.client.user.username}`, `${message.client.user.displayAvatarURL()}`, 'https://discord.com/invite/FAARS2NdjE')
                .setDescription(`A list of commands is below. Use \`${pref.prefix}help [command]\` for more detailed information on a command.`)
                .addField('Setup', '`linkrole`,`removelinkedrole` \n', false)
                .addField('General', '`help`, `invite`, `stats`, `support`, `upvote` \n', false)
                .addField('Customization', '`addcard`, `cardavatar`, `removecard`')
                .addField('Levelling', '`leaderboard`, `level`, `global`', false)
                .setFooter(`Users receive 1-15 XP whilst being in a voice channel & 15-25 XP per message sent every 30 seconds.`);
            message.channel.send(helpembed);
        }
    }
}