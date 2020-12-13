module.exports = (client) => {
    if(client.shard.ids[0] === 0) {
        console.log(`Logged in as ${client.user.tag}`);
        console.log(" ")
    }
    client.user.setActivity(`${client.guilds.cache.size} guilds | .mhelp`, {
        type: "WATCHING",
    });
}
