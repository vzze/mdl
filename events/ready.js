const { client } = require("../index")
const ranks = require("../data/ranks")

client.once('ready', async () => {
    await ranks.deleteMany({role_id: "0"});
    console.log(`Logged in as ${client.user.tag}`);
    setTimeout( () => {
        client.user.setActivity(`.mhelp | ${client.guilds.cache.size} guilds | discord.gg/mandem`, {
            type: "WATCHING",
        });
    }, 30000);
});
