const { token } = require("../config/config.json")
const { Client } = require(`discord.js`);
const client = new Client();

const commands = require("../functions/loaders/commandloader");
commands.exec(client);

const events = require("../functions/loaders/eventloader");
events.exec(client);

const db = require("../functions/loaders/dbloader");
db.exec(client);

process.on("unhandledRejection", err => {
    console.log(err);
})

client.login(token);