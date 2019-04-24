var express = require('express');
var morgan = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
var sass = require('node-sass-middleware');
var validator = require('express-validator');
var session = require('express-session');
var config = require('./config');

module.exports = function() {
    var app = express();

    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    }
    else {
        app.use(compression);
    }

    app.use(session({
        secret: config.sessionSecret,
        resave: false,
        saveUninitialized: true
    }));
    
    app.use(bodyParser.urlencoded({
        extended : true
    }));
    app.use(bodyParser.json());
    
    app.use(validator());

    app.set('views', './app/views');
    app.set('view engine', 'pug');

    require('../app/routes/index.route')(app);
    require('../app/routes/user.route')(app);

    app.use(sass({
        src: './sass',
        dest: './public/css',
        outputStyle: 'expanded',
        prefix: '/css',
        debug: true,
        indentedSyntax: true
    }));

    app.use(express.static('./public'));
    
    return app;
}