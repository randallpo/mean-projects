module.exports = {
    debug: true,
    mongoUri: "mongodb://localhost/twitter_clone",
    sessionSecret: 'dev_secret_key',
    facebook: {
        clientID: '393353194728569',
        clientSecret: '1dd7255191d36ecb5cdc5ca490099d1e',
        callbackURL: 'http://localhost:3000/oauth/facebook/callback'
    }
};