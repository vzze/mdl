const ranks = require('../../data/ranks');

module.exports = async (client, guild) => {
    await ranks.deleteMany({guild_id: `${guild.id}`});
    setTimeout(async () => {
        const prom = await client.shard.fetchClientValues('guilds.cache.size').catch(e => console.log(e));
        const glds = prom.reduce((u, guildCount) => u + guildCount, 0);
        client.user.setActivity(`${glds} guilds | .mhelp`, {
            type: "WATCHING",
        });
    }, 30000);
}
