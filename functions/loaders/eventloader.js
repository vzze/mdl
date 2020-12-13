const fs = require("fs")

module.exports.exec = (client) => {
    for(const f of fs.readdirSync('./events/').filter(file => file.endsWith('.js'))) {
        const event = require(`../../events/${f}`);
        const eventN = f.split(".").shift();
        if(client.shard.ids[0] === 0) console.log(`Loaded ${f}`);
        client.on(eventN, event.bind(null, client));
    }
    if(client.shard.ids[0] === 0) console.log(" ")
}