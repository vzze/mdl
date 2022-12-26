const mongoose = require("mongoose");
const { lvl } = require("../../config/config.json")

class database {
    constructor() {
        this.users = require("../../database/users");
        this.members = require("../../database/gusers");
        this.ranks = require("../../database/ranks");
        this.servers = require("../../database/pservers");
    }
    connect(clusteruser, clusterpass, clustercon) {
        mongoose.connect(`mongodb+srv://${clusteruser}:${clusterpass}@${clustercon}`, 
            {useNewUrlParser: true, useUnifiedTopology: true, autoIndex: false}  
        );
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'Connection error:'));
    }
    async createnewuser(id, amount, name) {
        const newu = new this.users({
            user_id: id, 
            xp: `${amount}`, 
            level: 0, 
            user_name: `${name}`,
            rankcardlink: 0,
            rankavatar: 1,
            prcolor: "0",
            seccolor: "0",
            quote: "0"
        });
        await newu.save();
        return newu;
    }
    async createnewmember(id, gid, name) {
        const newm = new this.members({
            user_id: id, 
            guild_id: `${gid}`,
            user_name: `${name}`,
            xp: 0,
            level: 0,
            warns: [],
        });
        await newm.save();
        return newm;
    }
    async addUserXP(id, amount, name) {
        const u = await this.users.findOne({ user_id: id });
        if(!u) {
            await this.createnewuser(id, amount, name);
            return;
        }
        let newxp = u.xp + amount;
        await u.updateOne({ xp: newxp });
        if(u.user_name != name) await u.updateOne({ user_name: `${name}` });
        if(newxp >= lvl[u.level] && u.level <= 149 && newxp >= 100) {
            u.level++;
            u.updateOne({ level: u.level });
            await u.save();
        } else {
            await u.save();
        }
    }
    async addMemberXP(id, amount, gid, name) {
        const m = await this.members.findOne({ user_id: id, guild_id: gid });
        if(!m) {
            await this.createnewmember(id, gid, name);
            let check = [0, 0];
            return check;
        }
        let newxp = m.xp + amount;
        await m.updateOne({ xp: newxp });
        if(m.user_name != name) await m.updateOne({ user_name: `${name}` });
        if(newxp >= lvl[m.level] && m.level <= 149 && newxp >= 100) {
            m.level++;
            m.updateOne({ level: m.level });
            await m.save();
            let check = [1, m.level];
            return check;
        } else {
            await m.save();
            let check = [0, m.level];
            return check;
        }
    }
    randomXP(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random()*(max-min+1)+min);
    }
}

module.exports = database;