const fs = require("fs")
const { Collection } = require("discord.js");

module.exports.exec = async (client) => {
    client.commands = new Collection();
    client.modules = new Collection();
    for(const dir of fs.readdirSync("./commands/")) {
        for(const cmd of fs.readdirSync(`./commands/${dir}/`).filter(cmd => cmd.endsWith('.js'))) {
            const command = require(`../../commands/${dir}/${cmd}`);
            client.commands.set(command.name, { cmd: command, module: dir });
        }
        client.modules.set(dir.toLowerCase(), dir);
        if(client.shard.ids[0] === 0) console.log(`Loaded ${dir} module`)
    }
}
