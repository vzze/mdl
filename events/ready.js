module.exports = (client) => {
    if(client.shard.ids[0] === 0) {
        console.log(`Logged in as ${client.user.tag}`);
        client.user.setActivity(`.mhelp | ${client.guilds.cache.size} guilds | discord.gg/mandem`, {
            type: "WATCHING",
        });
    }
}
