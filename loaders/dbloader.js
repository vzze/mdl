const config = require('../config/config.json');
const mongoose = require('mongoose');
const useruser = config.cluseruser;
const pass = config.clusterpass;

mongoose.connect(`mongodb+srv://${useruser}:${pass}@cluster.8lzpu.mongodb.net/database?retryWrites=true&w=majority`, 
    {useNewUrlParser: true, useUnifiedTopology: true, autoIndex: false}  
);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function() {
  console.log(`Connected to MongoDB as ${useruser}`);
});
    
