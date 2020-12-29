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
                let s = await servers.find();
                s.forEach(ss => {
                    if(ss.premium == 1) {
                        const news = new servers({
                            guild_id: ss.guild_id,
                            autovcparent: ss.autovcparent,
                            autovcchannel: ss.autovcchannel,
                            whitelisterolevc: ss.whitelisterolevc,
                            defaultlevelimage: ss.defaultlevelimage,
                            expirationdate: ss.expirationdate,
                        })
                        await news.save();
                    }
                    await ss.deleteOne();
                })
            })()
            
        }
    });
}

