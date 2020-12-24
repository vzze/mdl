const mongoose = require('mongoose');

Schema = mongoose.Schema;

const server = new Schema({
    guild_id: { type: String, unique: true },
    premium: { type: Number, unique: false, default: 0 },
    autovcparent: { type: String, unique: false, default: '0' },
    autovcchannel: {type: String, unique: false, default: '0'},
    whitelisterolevc: {type: String, unique: false, default: '0'},
    defaultlevelimage: {type: String, unique: false, default: '0'},
    defaultlevelchannel: {type: String, unique: false, default: '0'},
    expirationdate: {type: String, unique: false, default: '0'},
})

const servers = mongoose.model('servers', server);

module.exports = servers;