var passport = require('passport');
var LocalStragy = require('passport-local').Strategy;
var User = require('mongoose').model('User');

module.exports = function() {
    passport.use(new LocalStragy(function(userName, passport, done){
        User.findOne({userName: userName}, function(err, user){
            if (err) {return done(err);}
            if (!user || user.authenticate(password)) {
                return done(null, false, {
                    message: 'Invalide username or password'
                });
            }
            return done(null, user);
        });
    }));
};