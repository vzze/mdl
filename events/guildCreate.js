module.exports = (client) => {
    setTimeout( () => {
        client.user.setActivity(`.mhelp | ${client.guilds.cache.size} guilds | discord.gg/mandem`, {
            type: "WATCHING",
        });
    }, 30000);
}
