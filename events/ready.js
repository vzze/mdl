const { client } = require("../index")
const ranks = require("../data/ranks")

client.once('ready', async () => {
    await ranks.deleteMany({role_id: "0"});
    console.log(`Logged in as ${client.user.tag}`);
    client.user.setActivity(`discord.gg/mandem | .mhelp`, {
        type: "WATCHING",
    });

});
