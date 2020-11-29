const fs = require("fs")

module.exports = () => {
    fs.readdir('./events/', (err, files) => {
        if(err) console.error(err);
        let eventFiles = files.filter(file => file.endsWith('.js'));
        if(eventFiles.length <= 0) return console.log("No events to load.");
        eventFiles.forEach((f) => {
            require(`../events/${f}`);
            console.log(`Loaded ${f}`)
        });
        console.log("-------------");
    });
}