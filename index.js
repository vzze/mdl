const Discord = require(`discord.js`);
const client = new Discord.Client();
const config = require("./config/config.json")

require("./loaders/eventloader")();
require("./loaders/commandloader")(client);
require("./loaders/dbloader");

module.exports = {
    client: client,
    clientcmds: client.commands
}

client.login(config.token);