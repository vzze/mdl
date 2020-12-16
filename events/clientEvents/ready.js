const { shards } = require("../../config/config.json");

module.exports = async (client) => {
    if(client.shard.ids[0] === 0) {
        console.log(`Logged in as ${client.user.tag}`);
    }
    client.user.setActivity(`.mhelp`, {
        type: "WATCHING",
    });
}