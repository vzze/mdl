const users = require('../../data/users');
const lvls = require('../../config/levels.json');

module.exports = async (id, amount, name) => {
    let newlevel = 0;
    var query = { user_id: id }
    const u = await users.findOne(query);
    if(u!=undefined) {
        let newxp = u.xp + amount;
        await u.updateOne({ xp: newxp });
        await u.updateOne({ user_name: `${name}` });
        newlevel = u.level;
        if(newxp >= lvls.lvl[u.level] && u.level <= 149 && newxp >= 100) {
            newlevel = u.level + 1;
            await u.updateOne({ level: newlevel});
            await u.save();
        } else {
            await u.save();
        }
    } else {
        const newU = new users({
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
        newU.save();
    }
}