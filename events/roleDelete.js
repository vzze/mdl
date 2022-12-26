module.exports = {
    async run(mdl, role) {
        await mdl.db.ranks.deleteOne({ rank_id: role.id })
    }
}