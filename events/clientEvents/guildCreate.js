const servers = require('../../data/servers');
const { serverlist } = require("../../events/clientEvents/ready")

module.exports = { 
    async run(client, guild) {
        let g = await servers.findOne({guild_id: `${guild.id}`});
        if(g) return;
        const newS = new servers({
            guild_id: `${guild.id}`,
            premium: 0,
            autovcparent: '0',
            autovcchannel: '0',
            whitelisterolevc: '0',
            defaultlevelimage: '0',
            defaultlevelchannel: '0',
            expirationdate: '0',
            prefix: '0'
        })
        newS.save();
        serverlist.set(guild.id, {premium: 0, parent: 0, mainvc: 0, whitelist: 0, defaultlevelimage: 0});
    }
}
