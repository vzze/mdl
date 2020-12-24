const ranks = require('../../data/ranks');
const servers = require('../../data/servers');
const { serverlist } = require("../../events/clientEvents/ready")

module.exports = {
    async run(client, guild) {
        await ranks.deleteMany({guild_id: `${guild.id}`});
        await servers.deleteOne({guild_id: `${guild.id}`, premium: 0});
        serverlist.delete(guild.id);
    }
}