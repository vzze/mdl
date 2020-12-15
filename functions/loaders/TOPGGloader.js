const fs = require("fs")

module.exports.exec = (dbl) => {
    for(const f of fs.readdirSync('./events/dblEvents').filter(file => file.endsWith('.js'))) {
        const event = require(`../../events/dblEvents/${f}`);
        const eventN = f.split(".").shift();
        dbl.on(eventN, event.bind(null, dbl))
    }
    console.log("Loaded DBL events")
}