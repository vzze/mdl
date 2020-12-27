const { MessageEmbed } = require(`discord.js`);
const {prefix, owners} = require('../../config/config.json')

module.exports = {
    name: 'execshard',
    description: 'you actually think an owner command would be displayed',
    usage: `\`${prefix}so yeah i hit p\``,
    cooldown: 1,
    premium: "LMFAO",
    async execute(client, message, args) {
        if(message.author.id!=owners[0]) return;
        let method = args[0];
        let argument = message.content;
        if(argument.indexOf("```js")!=-1) {
            argument = argument.slice(argument.indexOf("```js")+5);
        } else {
            argument = argument.slice(argument.indexOf("```")+3)
        }
        argument = argument.slice(0, -3)
        argument.trim();
        
        switch(method) {
            case 'fetchClientValues':
                    client.shard.fetchClientValues(`${argument}`)
                        .then(val => message.channel.send(`\`\`\` ${val} \`\`\``))
                        .catch(e => message.channel.send(`\`\`\` ${e} \`\`\``));
            break;
            case 'broadcastEval':
                client.shard.broadcastEval(`${argument}`)
                    .then(val => message.channel.send(`\`\`\` ${val} \`\`\``))
                    .catch(e => message.channel.send(`\`\`\` ${e} \`\`\``));
            break;
        }
    }
}