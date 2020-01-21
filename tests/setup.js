jest.setTimeout(30000);

// require('../models/User');

const mongoose = require('mongoose');
const keys = require('../config/keys');

mongoose.Promise = global.Promise;
console.log('mongoUri in setup', keys.mongoURI);

mongoose.connect(keys.mongoURI, { useMongoClient: true }).catch(err=>{
  console.log('err', err);
  
})