const fs = require("fs")
const { Collection } = require("discord.js");

module.exports.exec = (client) => {
    client.commands = new Collection();
    if(client.shard.ids[0] === 0) console.log(" ")
    for(const cmd of fs.readdirSync('./commands/').filter(cmd => cmd.endsWith('.js'))) {
        const command = require(`../../commands/${cmd}`);
        if(client.shard.ids[0] === 0) console.log(`Loaded ${cmd}`);
        client.commands.set(command.name, command);
    }
    if(client.shard.ids[0] === 0) console.log(" ")
}
