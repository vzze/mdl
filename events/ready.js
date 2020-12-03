const { client } = require("../index")
const ranks = require("../data/ranks")

client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}`);
    client.user.setActivity(`.mhelp | ${client.guilds.cache.size} guilds | discord.gg/mandem`, {
        type: "WATCHING",
    });
});
