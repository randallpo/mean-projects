var mongoose = require('mongoose');
var passport = require('passport');

module.exports = function() {
    var User = mongoose.model('User');

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(user, done) {
        User.findOne({_id: id}, '-password -salt', 
            function(err, user) {
                done(null, user);
            });
    });
    require('./strategies/local.js')();
};