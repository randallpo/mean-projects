var passport = require('passport');
var LocalStragy = require('passport-local').Strategy;
var User = require('mongoose').model('User');

module.exports = function() {
    passport.use(new LocalStragy({usernameField: 'userName'},
      function(username, password, done){
        User.findOne({userName: username}, function(err, user){
            if (err) {return done(err);}
            if (!user || !user.authenticate(password)) {
                return done(null, false, {
                    message: 'Invalide username or password'
                });
            }
            return done(null, user);
        });
    }));
};