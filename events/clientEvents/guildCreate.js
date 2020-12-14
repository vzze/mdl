module.exports = (client) => {
    setTimeout(async () => {
        const prom = await client.shard.fetchClientValues('guilds.cache.size').catch(e => console.log(e));
        const glds = prom.reduce((u, guildCount) => u + guildCount, 0);
        client.user.setActivity(`${glds} guilds | .mhelp`, {
            type: "WATCHING",
        });
    }, 30000);
}
