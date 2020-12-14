const { token, dblToken, dblwebhookauth } = require("./config/config.json")
const { Client } = require(`discord.js`);
const DBL = require("dblapi.js")
const client = new Client();
const dbl = new DBL(dblToken, client);

const commands = require("./functions/loaders/commandloader");
commands.exec(client);

const events = require("./functions/loaders/eventloader");
events.exec(client);

const db = require("./functions/loaders/dbloader");
db.exec(client);

const discordbotlist = require("./functions/loaders/TOPGGloader");
discordbotlist.exec(client, dbl)

if(client.shard.ids[0] === 0) {
    const hook = new DBL(dblToken, {
        webhookPort: 6969,
        webhookAuth: dblwebhookauth
    })
    const weebhook = hook.webhook;
    const hooker = require("./functions/loaders/weebhookloader");
    hooker.exec(client, weebhook);
}

module.exports = {
    dbl: dbl,
}

client.login(token);