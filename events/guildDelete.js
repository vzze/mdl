const ranks = require('../data/ranks');

module.exports = async (client, guild) => {
    await ranks.deleteMany({guild_id: `${guild.id}`});
    setTimeout( () => {
        client.user.setActivity(`${client.guilds.cache.size} guilds | .mhelp`, {
            type: "WATCHING",
        });
    }, 30000);
}
