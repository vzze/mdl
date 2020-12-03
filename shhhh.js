/*const Discord = require('discord.js');
const { token, shards } = require("./config/config.json")

const manager = new Discord.ShardingManager('./bot.js', { 
    token: token,
    totalShards: "auto",
});

module.exports = {
  manager
}

manager.on('shardCreate', shard => {
    console.log(`Launched shard #${shard.id}`)
    shard.on("death", d => console.log(`Shard #${shard.id} died`));
    shard.on("error", err => console.error(err));
    shard.on("spawn", sp => console.log(`Shard #${shard.id} spawned`));
    shard.on("ready", r => console.log(`Shard #${shard.id} is ready`));
    shard.on("disconnect", disc => console.log(`Shard #${shard.id} disconnected`));
    shard.on("message", async message => await console.log(message));
});

manager.spawn("auto").catch(e => {
 // console.log()
}); */
