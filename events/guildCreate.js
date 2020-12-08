module.exports = (client) => {
    setTimeout( () => {
        client.user.setActivity(`${client.guilds.cache.size} guilds | .mhelp`, {
            type: "WATCHING",
        });
    }, 30000);
}
