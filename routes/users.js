const db = require('../config/mysql')();
module.exports = function (app) {
    /*------------------------------//select all users  select all users --------------------------------------------------------------------------------*/
    app.get('/dashborad/users', (req, res) => {
        let fetback;
        if (typeof req.session.fetback !== 'undefined') {
            //makeingfetback session
            fetback = req.session.fetback;
            console.log(req.session.fetback);
        }
        db.query(`SELECT users.id, users.username, users.passphrase, roles.name AS usersrole
            FROM users
            INNER JOIN roles
            ON roles_id = roles.id`, (err, results) => {
            if (err) throw err;
            res.render('dashborad/users', { results,fetback, userlevel: req.session.level });
            console.log(req.session.level);
        });
    });

    /*------------------------------  select all users end --------------------------------------------------------------------------------*/

    /*------------------------------//update  users  update  users -------------------------------------------------------------------------------------*/

    app.get('/dashborad/users/:id', function (req, res) {
        
        let dangermessage = 'du har ikke de rigtige level til at redigere bruger roler';
        let id = req.params.id;

        db.query( `SELECT users.id, users.username, users.passphrase, roles.name AS usersrole, roles.level AS \`level\`
        FROM users
        INNER JOIN roles
        ON roles_id = roles.id`, [id], (err, result1) =>{
            if(req.session.level ==  110){ // Super Admin
                db.query('SELECT * FROM users WHERE id =  ?', [id], function (err, results) {
                    if (err) throw err;
                    const currents = results;
                    db.query('SELECT * FROM roles WHERE roles.level < 110', [id], (err, results) => {
                        if (err) throw err;
                        res.render('dashborad/users_update', {
                            currents,
                            results
                        });
                    });
                });
            }
             else if(req.session.level == 100){
                db.query('SELECT * FROM users WHERE id =  ?', [id], function (err, results) {
                    if (err) throw err;
                    const currents = results;
                    db.query('SELECT * FROM roles WHERE roles.level < 100  ', [id], (err, results) => {
                        if (err) throw err;
                        res.render('dashborad/users_update', {
                            currents,
                            results
                        });
                    });
                });  
            } else{
                db.query('SELECT * FROM users',  (err, results) =>{
                    if(err){
                        throw err;
                    }
                    res.render('dashborad/users', { results, userlevel: req.session.level, dangermessage });
                })
            }
            });
        
        
    });

    app.patch('/dashborad/users/', function (req, res) {
        if(req.session.level == 110 || req.session.level === 100){
            let id = req.fields.id;
            req.session.fetback = 'du har nye opdater en da din brugers roler';
            let success = true;
            let errorMessage = [];  
            if (!req.fields.role || isNaN(req.fields.role) || req.fields.role == "0") {
                success = false;
                errorMessage.push('skiv  navn på en kategorie');
            }
            if (success) {
                db.query('UPDATE users SET  roles_id = ? WHERE (id = ?)', [req.fields.role, id], function (err, results) {
                    if (err) {
                        throw err;
                    }
                    res.json({
                        successful: true
                    });
                })
            } else {
                res.status('400');
                res.json({
                    errorMessage
                })
            }   
        }
    });
    /*------------------------------ delete users -------------------------------------------------------------------------------------*/
    app.delete('/dashborad/users/:id', function (req, res) {
        let id = req.params.id;
        db.query(`SELECT users.id, users.username, users.passphrase, roles.name AS usersrole, roles.level AS \`level\`
        FROM users
        INNER JOIN roles
        ON roles_id = roles.id
        WHERE users.id = ?`, [id],(err, results) =>{
            if(err) throw err;
            console.log(results[0].level);
            if ( req.session.level <= results[0].level ) {
                res.redirect('/dashborad');
            } else { 
                let id = req.params.id;
                db.query(`DELETE FROM users WHERE id = ?`, [id], function (err, data) {
                    if (err) throw err;
                    res.status(200);
                    res.end();
                })
                    res.status(401); // Unauthorized
                    res.end();
            }
        });
    });
}