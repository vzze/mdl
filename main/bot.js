const MDL = require("./base")
const client = new MDL();

client.loadCommands();
client.loadEvents();
client.loadDatabase();

process.on("unhandledRejection", err => {
    console.log(err);
})

client.login(client.config.token);