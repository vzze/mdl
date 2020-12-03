const users = require('../data/users');
const lvls = require('../config/levels.json');

module.exports = async (id, amount, name, checker, newlvl) => {
    levelupchecker = checker
    newlevel = newlvl;
    var query = { user_id: id }
    const u = await users.findOne(query);
    if(u!=undefined) {
        let newxp = u.xp + amount;
        await u.updateOne({ xp: newxp });
        await u.updateOne({ user_name: `${name}` });
        newlevel = u.level;
        if(newxp >= lvls.lvl[u.level] && u.level <= 99 && newxp >= 100) {
            levelupchecker = 1;
            newlevel = u.level + 1;
            await u.updateOne({ level: newlevel});
            await u.save();
            return newlevel, levelupchecker;
        } else {
            await u.save();
            return newlevel, levelupchecker;
        }
    } else {
        const newU = new users({
            user_id: id, 
            xp: `${amount}`, 
            level: 0, 
            user_name: `${name}`,
            rankcardlink: 0,
            rankavatar: 1
        });
        newU.save();
        return newlevel, levelupchecker;
    }
}