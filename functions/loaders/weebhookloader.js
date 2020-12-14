const fs = require("fs")

module.exports.exec = (client, weebhook) => {
    for(const f of fs.readdirSync('./events/weebHookevents').filter(file => file.endsWith('.js'))) {
        const event = require(`../../events/weebHookevents/${f}`);
        const eventN = f.split(".").shift();
        if(client.shard.ids[0] === 0) console.log(`Loaded ${f}`);
        weebhook.on(eventN, event.bind(null, weebhook))
    }
    if(client.shard.ids[0] === 0) console.log(" ")
}