const { token, dblToken } = require("../config/config.json")
const { Client } = require(`discord.js`);
const client = new Client();
const DBL = require("dblapi.js");
const dbl = new DBL(dblToken, client);

const commands = require("../functions/loaders/commandloader");
commands.exec(client);

const events = require("../functions/loaders/eventloader");
events.exec(client);

const db = require("../functions/loaders/dbloader");
db.exec(client);

const discordbotlist = require("../functions/loaders/TOPGGloader");
discordbotlist.exec(client, dbl)

client.login(token);