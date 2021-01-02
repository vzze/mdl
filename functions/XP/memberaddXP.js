const members = require("../../data/guildusers");
const lvls = require('../../config/levels.json');

module.exports = async (id, amount, name, gid) => {
    let levelupchecker = 0;
    let newlevel = 0;
    var query = { user_id: id, guild_id: gid }
    const u = await members.findOne(query);
    if(u!=undefined) {
        let newxp = u.xp + amount;
        await u.updateOne({ xp: newxp });
        await u.updateOne({ user_name: `${name}` });
        newlevel = u.level;
        if(newxp >= lvls.lvl[u.level] && u.level <= 149 && newxp >= 100) {
            levelupchecker = 1;
            newlevel = u.level + 1;
            await u.updateOne({ level: newlevel});
            await u.save();
            let a = [levelupchecker, newlevel];
            return a;
        } else {
            await u.save();
            let a = [levelupchecker, newlevel];
            return a;
        }
    } else {
        const newU = new members({
            user_id: id, 
            guild_id: `${gid}`,
            user_name: `${name}`,
            xp: 0,
            level: 0,
        });
        newU.save();
        let a = [levelupchecker, newlevel];
        return a;
    }
}