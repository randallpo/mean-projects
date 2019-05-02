var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var config = require('../config');
var user = require('../../app/controllers/user.controller');

module.exports = function() {
    passport.use(new FacebookStrategy({
        clientID: config.facebook.clientID,
        clientSecret: config.facebook.clientSecret,
        callbackURL: config.facebook.callbackURL,
        profileFields: ['id', 'email', 'name'],
        passReqToCallback: true}, 
        function(req, accessToken, refreshToken, profile, done) {
            var providerData = profile._json;
            providerData.accessToken = accessToken;
            providerData.refreshToken = refreshToken;

            var providerUserProfile = {
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                email: profile.email,
                userName: profile.username,
                provider: 'facebook',
                providerId: profile.id,
                providerData: providerData
            };
        console.log("given name  " + profile.name.givenName);
        console.log("family name " + profile.name.familyName);
        console.log("email       " + profile.email);
        console.log("id          " + profile.id);
        user.saveOAuthUserProfile(req, providerUserProfile, done);
    
        }));    
}