const { Client } = require(`discord.js`);
const client = new Client();
const config = require("./config/config.json")

const commands = require("./functions/loaders/commandloader");
commands.exec(client);
const events = require("./functions/loaders/eventloader");
events.exec(client);
const db = require("./functions/loaders/dbloader");
db.exec(client);

client.login(config.token);