const users = require('../../data/users');
const lvls = require('../../config/levels.json');

module.exports = async (id, amount, name, checker, newlvl) => {
    let levelupchecker = 0;
    let newlevel = 0;
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
            let a = [levelupchecker, newlevel];
            return a;
        } else {
            await u.save();
            let a = [levelupchecker, newlevel];
            return a;
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
        let a = [levelupchecker, newlevel];
        return a;
    }
}