const { client } = require("../index")
const ranks = require('../data/ranks');

client.on('guildCreate', async guild => {
    setTimeout( () => {
        client.user.setActivity(`discord.gg/mandem`, {
            type: "WATCHING",
        });
    }, 30000);
});
