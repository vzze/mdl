const fs = require("fs")

module.exports.exec = (client) => {
    for(const f of fs.readdirSync('./events/').filter(file => file.endsWith('.js'))) {
        const event = require(`../events/${f}`);
        const eventN = f.split(".").shift();
        client.on(eventN, event.bind(null, client));
    }
        
}