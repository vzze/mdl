const mongoose = require("mongoose");

Schema = mongoose.Schema;

const member = new mongoose.Schema({
    user_id: { type: String, unique: false },
    guild_id: { type: String, unique: false},
    user_name: { type: String, unique: false, default: undefined },
    xp: { type: Number, default: null },
    level: { type: Number, default: null },
    warns: { type: [String], default: [] }
})

const members = mongoose.model('members', member)

module.exports = members;