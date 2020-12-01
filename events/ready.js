const { client } = require("../index")

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
    client.user.setActivity(`${client.guilds.cache.size} guilds || .mhelp`, {
        type: "WATCHING",
    });

});