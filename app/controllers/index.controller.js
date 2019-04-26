exports.render = function(req, res) {  
    res.render('index', {
        title: 'Hello World',
        userName: req.user ? req.user.userName : ''
    });
};
