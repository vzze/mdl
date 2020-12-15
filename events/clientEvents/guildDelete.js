const ranks = require('../../data/ranks');

module.exports = async (client, guild) => {
    await ranks.deleteMany({guild_id: `${guild.id}`});
}
