const { client } = require("../index")
const ranks = require('../data/ranks');

client.on('guildCreate', async guild => {
    for(var j = 100; j >= 1; j = j - 1) {
        const newGuild = new ranks({ guild_id: `${guild.id}`, rank_id: j, role_id: '0'});
        newGuild.save();
    }
    client.user.setActivity(`${client.guilds.cache.size} guilds || .mhelp`, {
        type: "WATCHING",
    });
});