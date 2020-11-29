const { client } = require("../index")

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
  //  const activities = [
  //      `${client.guilds.cache.size} guilds`,
  //      `.mhelp`
 //   ];
 //   let i = 0;
 //   setInterval(() => {
        client.user.setActivity(`.mhelp`, {
            type: "WATCHING",
          });
 //   }, 30000);

});

// `${activities[i++ % activities.length]}