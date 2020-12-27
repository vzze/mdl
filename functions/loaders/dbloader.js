const config = require('../../config/config.json');
const mongoose = require('mongoose');
const users = require("../../data/users")
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
                let m = await users.find();
                m.forEach(async l => {
                    const newl = new users({
                        user_id: l.user_id,
                        xp: l.xp,
                        level: l.level,
                        user_name: l.user_name,
                        rankcardlink: l.rankcardlink,
                        rankavatar: l.rankavatar,
                        prcolor: "0",
                        seccolor: "0",
                        quote: "0"
                    });
                    await newl.save();
                    await l.deleteOne();
                })
            })();
        }
    });
}

