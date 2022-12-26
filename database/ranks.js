const mongoose = require('mongoose');

Schema = mongoose.Schema;

const rank = new Schema({
    guild_id: { type: String, unique: true },
    rank_id: { type: Number, unique: false, default: 0 },
    role_id: { type: String, unique: false, default: 0 }
})

const ranks = mongoose.model('ranks', rank);

module.exports = ranks;