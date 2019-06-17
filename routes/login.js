const db = require('../config/mysql')();

module.exports = function (app) {
    app.get('/login', (req, res) => {
        res.render('login')
    })
    app.post('/login', function (req, res) {
        let success = true;
        let errorMessage;
        if (req.fields) {
            if (!req.fields.username && !req.passphrase == '') {
                success = false;
                errorMessage = 'et eller flere felter er tomme';
            }
            else if (!req.fields.username || !req.fields.username > 1) {
                success = false;
                errorMessage = 'skiv  dit dit username';
            }

            else if (!req.fields.passphrase || !req.fields.passphrase > 1) {
                success = false;
                errorMessage = 'skiv  dit password';
            }
        } else {
            success = false;
            errorMessage = 'alt er gået galt'
        }
        if (success) {

            db.query(`SELECT id FROM users WHERE username = ? AND passphrase = ?`, [req.fields.username, req.fields.passphrase], function (err, result) {
                if (err) return res.send(err);
                if (result.length === 1) {
                    req.session.user = result[0].id;
                    res.redirect('/admin');
                } else {
                    res.redirect('/login');
                }
            })
        }
        else {
            res.render('login', { 'errorMessage': errorMessage, ...req.fields })
        }
    });
}