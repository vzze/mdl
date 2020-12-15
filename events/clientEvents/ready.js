const { shards, dblToken, dblwebhookauth } = require("../../config/config.json");
const DBL = require("dblapi.js");

module.exports = async (client) => {
    if(client.shard.ids[0] === 0) {
        console.log(`Logged in as ${client.user.tag}`);
    }
    if(client.shard.ids[0] === (shards - 1)) {
        const dbl = new DBL(dblToken, {
            webhookPort: 1602,
            webhookAuth: dblwebhookauth,
            webhookPath: "/mdlweebhook"
        }, client);
        const discordbotlist = require("../../functions/loaders/TOPGGloader");
        discordbotlist.exec(dbl)
        const weebhook = dbl.webhook;
        const hooker = require("../../functions/loaders/weebhookloader");
        hooker.exec(weebhook);
        setInterval(async () => {
            const prom = await client.shard.fetchClientValues('guilds.cache.size').catch(e => console.log(e));
            const glds = prom.reduce((u, guildCount) => u + guildCount, 0);
            client.user.setActivity(`${glds} guilds | .mhelp`, {
                type: "WATCHING",
            });
        }, 30000);
    }
}