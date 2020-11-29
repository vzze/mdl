const fs = require("fs")
const Discord = require("discord.js");

module.exports = (client) => {
    client.commands = new Discord.Collection();
    fs.readdir('./commands/', (err, files) => {
        if(err) console.error(err);
        let commandFiles = files.filter(file => file.endsWith('.js'));
        if(commandFiles.length <= 0) return console.log("No commands to load.");
        commandFiles.forEach((f) => {
            const command = require(`../commands/${f}`);
            console.log(`Loaded ${command.name}`);
            client.commands.set(command.name, command);
        });
        console.log("-------------");
    });
}
