const mongoose = require('mongoose');

Schema = mongoose.Schema;

const member = new Schema({
    user_id: { type: String, unique: false },
    xp: { type: Number, default: null },
    level: { type: Number, default: null },
    guild_id: { type: String, unique: false, default: '0' },
});

const members = mongoose.model('members', member)

module.exports = members;