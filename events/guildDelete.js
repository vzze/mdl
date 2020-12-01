const { client } = require("../index")
const ranks = require('../data/ranks');

client.on('guildDelete', async guild => {
    await ranks.deleteMany({guild_id: `${guild.id}`});
    setTimeout( () => {
        client.user.setActivity(`${client.guilds.cache.size} guilds || .mhelp`, {
            type: "WATCHING",
        });
    }, 10000);
});