const db = require('../config/mysql')();
const bcrypt = require('bcryptjs');
const checkrole = require('../middleware/role-check');
const fs = require('fs');
module.exports = function (app) {
     /*------------------------------ //delete session this route rote is for delte a  session  fetback---------------------------------------------------*/  
   app.get('/dashborad/dashborad/users/session',  [checkrole.admins, checkrole.superadmins, checkrole.moderators], (req,res) =>{   
    let fetback;
    delete req.session.fetback;
    db.query(`SELECT users.id, users.username, users.passphrase, roles.name AS usersrole
            FROM users
            INNER JOIN roles
            ON roles_id = roles.id`, (err, results) => {
            if (err) throw err;
            res.render('dashborad/users', { results,fetback, userlevel: req.session.level });
           
        });
   });
    /*------------------------------ this route rote is for delte a  session  fetback end---------------------------------------------------*/ 
    /*------------------------------//select all users  select all users --------------------------------------------------------------------------------*/
    app.get('/dashborad/users', [checkrole.admins, checkrole.superadmins, checkrole.moderators], (req, res) => {
        let fetback;
        if (typeof req.session.fetback !== 'undefined') {
            //makeingfetback session
            fetback = req.session.fetback;
           
        }
        db.query(`SELECT users.id, users.username, users.passphrase, roles.name AS usersrole
            FROM users
            INNER JOIN roles
            ON roles_id = roles.id`, (err, results) => {
            if (err) throw err;
            res.render('dashborad/users', { results,fetback, userlevel: req.session.level });
        });
    });

    /*------------------------------  select all users end --------------------------------------------------------------------------------*/

    /*------------------------------//update  users  update  users -------------------------------------------------------------------------------------*/

    app.get('/dashborad/users/:id', [checkrole.admins, checkrole.superadmins], function (req, res) {
        
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
                            results,
                            userlevel: req.session.level
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
                            results, 
                            userlevel: req.session.level
                        });
                    });
                });  
            }else{
                db.query('SELECT * FROM users', [checkrole.admins, checkrole.superadmins],  (err, results) =>{
                    if(err){
                        throw err;
                    }
                    res.render('dashborad/users', { results, userlevel: req.session.level, dangermessage });
                })
            }
            });
        
        
    });

    app.patch('/dashborad/users/:id', [checkrole.admins, checkrole.superadmins], function (req, res) {
            let id = req.params.id;
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
    });
    /*------------------------------ delete users -------------------------------------------------------------------------------------*/
    app.delete('/dashborad/users/:id', [checkrole.admins, checkrole.superadmins], function (req, res) {
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
                db.query(`DELETE FROM users WHERE id = ?`, [id], [checkrole.admins, checkrole.superadmins], function (err, data) {
                    if (err) throw err;
                    res.status(200);
                    res.end();
                })
                    res.status(401); // Unauthorized
                    res.end();
            }
        });
    });
     /*------------------------------ get single user so they can change password -------------------------------------------------------------------------------------*/
     app.get('/dashborad/user/change/password/:id', [checkrole.admins, checkrole.superadmins, checkrole.moderators], function (req, res) {
        let id = req.params.id;
        db.query('SELECT * FROM users WHERE id =  ?', [id], function (err, results) {
            if (err) throw err;
            res.render('dashborad/user_change_password', { 'results': results[0] });
        });
    });
     /*------------------------------ get single user so they can change password end -------------------------------------------------------------------------------------*/
     app.patch('/dashborad/user/:id', [checkrole.admins, checkrole.superadmins, checkrole.moderators], function (req, res) {
        let id = req.params.id;
        let success = true;
        let errorMessage;
        /* here i am making a  sesion text for the fetback sesion*/ 
        req.session.fetback = 'du har  opdatert dit password';

		if(req.fields.passphrase === ''){
            success = false;
            errorMessage = 'feltet passphrase er tomt';	
        }
         if(req.fields.repeatpassphrase === ''){
            success = false;
            errorMessage = 'feltet repeatpassphrase er tomt';	
        }
        if(success){
            let hashedpassphrase = bcrypt.hashSync(req.fields.passphrase, 10);
            db.query('UPDATE users SET passphrase = ?  WHERE id = ?', [hashedpassphrase, id], function (err, results) {
                if (err) {
                    throw err;
                }
    
                res.json({ successful: true })
            }) 
        }else{
            res.status('400');
            res.json({errorMessage}) 
        }
        
    });


    app.patch('/profile/image/:id', (req, res, next) => {
        let id = req.params.id;
		const file = req.files.photo;
		const renamedFilename = `${Date.now()}_${file.name}`;
		let success = true;
		let errorMessage;

		/* console.log(file); */
		if (file.type.indexOf('image') === -1) {
			errorMessage = 'du har ikke valgt en korat fil type';
			success = false;
		}
		/* console.log(renamedFilename);
		console.log(req.files); */
		if (!success) {
			res.status(400);
			res.json({ errorMessage });
			return;
		}
		fs.readFile(file.path, (err, data) => {
			if (err) return next(`${err} at fs.readFile (${__filename}:35:5)`);
			fs.writeFile(`./public/media/${renamedFilename}`, data, err => {
                const sql = 'SELECT photos FROM users  WHERE id = ?';
                db.query(sql, [req.params.id], (err, results) => {
                    if(results[0].photos !== 'default.jpg'){
                        fs.unlink(`./public/media/${results[0].photos}`, function (err, data) {
                            if (err) throw err
    
                        });
                    }
                });   
					if (err) return next(`${err} at db.query (${__filename}:39:9)`);
					db.query('UPDATE users SET photos = ? WHERE id = ?', [ renamedFilename,id], (err, result) => {
                        if (err) return next(`${err} at db.query (${__filename}:41:11)`);
                        res.status(200);
                        app.locals.userphotos = renamedFilename;
						res.json({
							photo: renamedFilename
						});
					});
			});
		});

	});
}