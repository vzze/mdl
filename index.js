const Discord = require("discord.js");
const { token, shards } = require("./config/config.json");

const manager = new Discord.ShardingManager('./bot.js', {
    token: token,
    respawn: true,
});

manager.on("shardCreate", shard => {
    console.log(`Created Shard ${shard.id}`)
    shard.on("message", message => {
        console.log(`Shard ${shard.id} : ${message._fetchProp || message._eval} : ${message._result}`);
    });

    shard.on("disconnect", () => {
        console.log(`Shard ${shard.id} disconnected`);
    })

    shard.on("reconnecting", () => {
        console.log(`Shard ${shard.id} is reconnecting`);
    })

    shard.on("error", () => {
        shard.respawn();
    })

    shard.on("ready", () => {
        console.log(`Shard ${shard.id} is ready`);
    })

    shard.on("spawn", () => {
        console.log(`Shard ${shard.id} spawned`);
    })

    shard.on("death", () => {
        console.log(`Shard ${shard.id} died`);
    })
});

manager.spawn(shards);



