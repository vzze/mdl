const { Client} = require(`discord.js`);
const client = new Client({
  //  shardCount: shards
});
const config = require("./config/config.json")

/*
client.on("shardError", err => console.log(err));
client.on("shardReady", r => console.log(`[CLIENT SIDE] Shard #${client.shard.ids} is ready`));
client.on("shardDisconnect", r => console.log(`[CLIENT SIDE] Shard #${client.shard.ids} disconnected`));
client.on("shardReconnecting", t => console.log(`[CLIENT SIDE] Shard #${client.shard.ids} is reconnecting`));
client.on("shardResume", t => console.log(`[CLIENT SIDE] Shard #${client.shard.ids} resumed`));
*/

require("./loaders/eventloader")();
require("./loaders/commandloader")(client);
require("./loaders/dbloader");

module.exports = {
    client: client,
    clientcmds: client.commands
}

client.login(config.token);