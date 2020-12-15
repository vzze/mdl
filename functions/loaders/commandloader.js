const fs = require("fs")
const { Collection } = require("discord.js");

module.exports.exec = (client) => {
    client.commands = new Collection();
    for(const cmd of fs.readdirSync('./commands/').filter(cmd => cmd.endsWith('.js'))) {
        const command = require(`../../commands/${cmd}`);
        client.commands.set(command.name, command);
    }
    if(client.shard.ids[0] === 0) console.log(`Loaded commands`)
}
