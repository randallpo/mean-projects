module.exports = function(app) {
    var user = require('../controllers/user.controller');
    app.post('/login', user.login);
    app.post('/logout', user.logout);
    app.route('/user')
        .post(user.create)
        .get(user.list);
    app.route('/user/:userName')
        .get(user.read)
        .put(user.update)
        .delete(user.delete);
    app.param('userName', user.userByUserName);
}