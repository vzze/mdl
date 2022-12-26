const { run } = require("./message");

module.exports = {
    async run(mdl, g) {
        await mdl.db.ranks.deleteMany({ guild_id: g.id });
        await mdl.db.members.deleteMany({ guild_id: g.id });
    }
}