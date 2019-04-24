exports.login = function(req, res) {
    req.checkBody('email', 'Invalid email').notEmpty().isEmail();
    req.sanitizeBody('email').normalizeEmail();
    var errors = req.validationErrors();
    if (errors) {
        res.render('index', {
            title: 'There have been validation errors: ' + JSON.stringify(errors), 
            isLoggedIn: false
        });
        return;            
    }
    if (req.body.remember === 'remember') {
        req.session.remember = true;
        req.session.email = req.body.email;
        //req.sessionOptions.maxAge = 60000;
        req.session.cookie.maxAge = 60000;
    }

    res.render('index', {
        title: 'Login as ' + req.body.email, 
        isLoggedIn: true
    });
};

exports.logout = function(req, res) {
    req.session = null;

    res.render('index', {
        title: 'See you again later', 
        isLoggedIn: false
    });
};

var User = require('mongoose').model('User');
exports.create = function(req, res, next) {
    var user = new User(req.body);
    user.save(function(err) {
        if (err) {
            return next(err);
        }
        else {
            res.json(user);
        }
    });
};

exports.list = function(req, res, next) {
    User.find({}, function(err, users) {
        if (err) {
            return next(err);
        }
        else {
            res.json(users);
        }
    });
};

exports.read = function(req, res) {
    res.json(req.user);
};

exports.update = function(req, res, next) {
    User.findOneAndUpdate(
        {userName: req.user.userName}, req.body,
        function(err, user) {
        if (err) {
            return next(err);
        }
        else {
            res.json(user);
        }
    });
};

exports.delete = function(req, res, next) {
    req.user.remove(
        function(err) {
        if (err) {
            return next(err);
        }
        else {
            res.json(req.user);
        }
    });
};

exports.userByUserName = function(req, res, next, userName) {
    User.findOne(
        {userName: userName}, 
        function(err, user) {
        if (err) {
            return next(err);
        }
        else {
            req.user = user;
            next();
        }
    });
};