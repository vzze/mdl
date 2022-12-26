const { ShardingManager } = require('kurasuta');
const { isMaster } = require("cluster");
const { Client } = require("discord.js-light");
const { join } = require('path');

const sharder = new ShardingManager(join(__dirname, 'bot'), {
    client: Client,
    clientOptions: {
        cacheGuilds: true,
        cacheChannels: false,
        cacheOverwrites: false,
        cacheRoles: false,
        cacheEmojis: false,
        cachePresences: false,
        messageCacheMaxSize: 0,
        messageCacheLifetime: 1,
        messageSweepInterval: 1,
        messageEditHistoryMaxSize: 1,
        disabledEvents: [
            "channelCreate",
            "channelDelete",
            "channelUpdate",
            "channelPinsUpdate",
            "emojiCreate",
            "emojiDelete",
            "emojiUpdate",
            "guildBanAdd",
            "guildBanRemove",
            "guildIntegrationsUpdate",
            "guildUnavailable",
            "guildUpdate",
            "guildMemberAdd",
            "guildMemberRemove",
            "guildMembersChunk",
            "guildMemberSpeaking",
            "guildMemberUpdate",
            "inviteCreate",
            "inviteDelete",
            "messageDelete",
            "messageUpdate",
            "messageDeleteBulk",
            "messageReactionAdd",
            "messageReactionRemove",
            "messageReactionRemoveAll",
            "messageReactionRemoveEmoji",
            "roleCreate",
            "roleUpdate",
            "presenceUpdate",
            "rateLimit",
            "typingStart",
            "userUpdate",
            "warn",
            "debug",
            "error",
            "webhookUpdate"
        ]
    },
    shardCount: 2,
    clusterCount: 1,
    respawn: true,
    retry: true,
    development: false,
});

if(isMaster) {
    sharder.on("debug", d => { console.log(d) })
    .on("message", m => { console.log(m); });
}
 
sharder.spawn();