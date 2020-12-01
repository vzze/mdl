const { client } = require("../index")
const ranks = require('../data/ranks');

client.on('guildCreate', async guild => {
    setTimeout( () => {
        client.user.setActivity(`${client.guilds.cache.size} guilds || .mhelp`, {
            type: "WATCHING",
        });
    }, 30000);
});