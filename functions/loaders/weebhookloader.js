const fs = require("fs")

module.exports.exec = (weebhook) => {
    for(const f of fs.readdirSync('./events/weebHookevents').filter(file => file.endsWith('.js'))) {
        const event = require(`../../events/weebHookevents/${f}`);
        const eventN = f.split(".").shift();
        weebhook.on(eventN, event.bind(null, weebhook))
    }
    console.log("Loaded weebhook")
}