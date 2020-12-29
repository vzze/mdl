const config = require('../../config/config.json');
const mongoose = require('mongoose');
const servers = require("../../data/servers");
const useruser = config.cluseruser;
const pass = config.clusterpass;
module.exports.exec = (client) => {
    mongoose.connect(`mongodb+srv://${useruser}:${pass}@cluster.8lzpu.mongodb.net/database?retryWrites=true&w=majority`, 
        {useNewUrlParser: true, useUnifiedTopology: true, autoIndex: false}  
    );

    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'Connection error:'));
    db.once('open', function() {
        if(client.shard.ids[0] === 0) {
            console.log(`Connected to MongoDB as ${useruser}`);
            (async () => {
                const news = new servers({
                    guild_id: '761218352365699124',
                    autovcparent: '762008540297953320',
                    autovcchannel: '792405263583936512',
                    whitelisterolevc: '761223076943757323',
                    defaultlevelimage: '0',
                    expirationdate: 'PERMANENT',
                })
                news.save();
            })()

        }
    });
}

