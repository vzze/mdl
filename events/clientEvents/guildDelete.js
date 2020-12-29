const ranks = require('../../data/ranks');
const { serverlist } = require("../../events/clientEvents/ready");

module.exports = {
    async run(client, guild) {
        await ranks.deleteMany({guild_id: `${guild.id}`});
        if(serverlist.has(guild.id)) serverlist.delete(guild.id);
    }
}