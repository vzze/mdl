const mongoose = require('mongoose');

Schema = mongoose.Schema;

const user = new Schema({
    user_id: { type: String, unique: false },
    xp: { type: Number, default: null },
    level: { type: Number, default: null },
    user_name: { type: String, unique: false, default: undefined },
    rankcardlink: { type: String, unique: false, default: null },
    rankavatar: { type: Number, unique: false, default: 1 },
    prcolor: { type: String, unique: false, default: null },
    seccolor: { type: String, unique: false, default: null },
    quote: { type: String, unique: false, default: null }
});

const users = mongoose.model('users', user)

module.exports = users;