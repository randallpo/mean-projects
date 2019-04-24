var config = require('./config');
var mongoose = require('mongoose');

module.exports = function() {
    mongoose.set('debug', config.debug);
    var db = mongoose.connect(config.mongoUri, {useNewUrlParser: true});
    mongoose.set('useCreateIndex', true);
    mongoose.set('useFindAndModify', false);
    require('../app/models/user.model');
    return db;
}