const { Collection } = require("discord.js");
const servers = require('../../data/servers');
const SVS = new Collection();

module.exports = {
    serverlist: SVS,
    run(client) {
        if(client.shard.ids[0] === 0) {
            console.log(`Logged in as ${client.user.tag}`);
        }
        (async () => {
            const s = await servers.find();
            s.forEach(ss => {
                SVS.set(ss.guild_id, {premium: ss.premium, parent: ss.autovcparent, mainvc: ss.autovcchannel, whitelist: ss.whitelisterolevc, defaultlevelimage: ss.defaultlevelimage});
            })
        })()
        client.user.setActivity(`.mhelp`, {
            type: "WATCHING",
        });
    }
}