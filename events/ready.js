module.exports = async (client) => {
    if(client.shard.ids[0] === 0) {
        console.log(`Logged in as ${client.user.tag}`);
        console.log(" ")
    }
        if(client.shard.ids[0] === 1) {
        const prom = await client.shard.fetchClientValues('guilds.cache.size').catch(e => console.log(e));
        const glds = prom.reduce((u, guildCount) => u + guildCount, 0);
        client.user.setActivity(`${glds} guilds | .mhelp`, {
            type: "WATCHING",
        });
    }
}
