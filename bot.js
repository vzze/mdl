const { Client, ShardClientUtil } = require(`discord.js`);
const client = new Client();
const config = require("./config/config.json")

const commands = require("./loaders/commandloader")
commands.exec(client);
const events = require("./loaders/eventloader")
events.exec(client);
require("./loaders/dbloader");

client.login(config.token);