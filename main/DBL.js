const { dblToken, dblwebhookauth, shards } = require("../config/config.json")

module.exports.exec = (client) => {
    const DBL = require("dblapi.js");
    const dbl = new DBL(dblToken, {
        webhookPort: 1602,
        webhookAuth: dblwebhookauth,
        webhookPath: "/mdlweebhook"
    }, client);
    setInterval(async () => {
        const prom = await client.shard.fetchClientValues('guilds.cache.size').catch(e => console.log(e));
        const glds = prom.reduce((u, guildCount) => u + guildCount, 0);
        dbl.postStats(glds, 0, shards);
    }, 1800000);
    const discordbotlist = require("../functions/loaders/TOPGGloader");
    discordbotlist.exec(dbl)

    const weebhook = dbl.webhook;
    const hooker = require("../functions/loaders/weebhookloader");
    hooker.exec(weebhook);
}