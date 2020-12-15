const fs = require("fs")

module.exports.exec = (client, dbl) => {
    for(const f of fs.readdirSync('./events/dblEvents').filter(file => file.endsWith('.js'))) {
        const event = require(`../../events/dblEvents/${f}`);
        const eventN = f.split(".").shift();
        dbl.on(eventN, event.bind(null, dbl))
    }
    if(client.shard.ids[0] === 0) console.log("Loaded DBL events")
}