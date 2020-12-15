const { shards } = require("../../config/config.json");

module.exports = async (client) => {
    if(client.shard.ids[0] === 0) {
        console.log(`Logged in as ${client.user.tag}`);
    }
    if(client.shard.ids[0] === (shards - 1)) {
        const DBL = require("../../main/DBL");
        DBL.exec(client)
        setInterval(async () => {
            const prom = await client.shard.fetchClientValues('guilds.cache.size').catch(e => console.log(e));
            const glds = prom.reduce((u, guildCount) => u + guildCount, 0);
            client.user.setActivity(`${glds} guilds | .mhelp`, {
                type: "WATCHING",
            });
        }, 1800000);
    }
}