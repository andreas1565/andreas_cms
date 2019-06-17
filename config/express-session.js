const session = require('express-session');
module.exports = function (app) {
    // Setup session handling do i can use express-session
    app.use(session({
        'resave': false,
        'saveUninitialized': true,
        'secret': 'really secret stuffs'
    }));

    // This is an authentication middleware that restricts access to /admin/*
    app.use('/admin', (req, res, next) => {
        if (!req.session.user) {
            res.redirect('/login');
            return;
        } else {
            next();
        }
    });
}