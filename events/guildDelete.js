const { client } = require("../index")
const ranks = require('../data/ranks');

client.on('guildDelete', async guild => {
    await ranks.deleteMany({guild_id: `${guild.id}`});
    setTimeout( () => {
        client.user.setActivity(`.mhelp | discord.gg/mandem`, {
            type: "WATCHING",
        });
    }, 30000);
});
