const db = require('../config/mysql')();
const bcrypt = require('bcryptjs');
module.exports = function (app) {
/*------------------------------ this route rote render login---------------------------------------------------*/
    app.get('/login', (req, res, next) => {
		res.render('login');
    });

/*------------------------------ this post is doing so the user can login --------------------------------------------*/

    app.post('/login', (req, res, next) => {
        let success = true;
        let errorMessage;
		if(req.fields.username === ''){
				success = false;
				errorMessage = 'feltet username er tomt';
		}
		if(req.fields.passphrase === ''){
			success = false;
			errorMessage = 'feltet passphrase er tomt';	
		}
		if(req.fields.username === '' || req.fields.passphrase === ''){
            success = false;
			errorMessage = 'Et eller flere felter var tomme';
		}
		if(success){
			db.query(`SELECT users.id ,users.username ,users.passphrase, users.roles_id,  roles.level  FROM users 
			INNER JOIN roles
			ON users.roles_id = roles.id
			WHERE username = ?`, [req.fields.username], (err, result) => {
				if (err) return next(`${err} at db.query (${__filename}:9:5)`);
				if (result.length == 0) {
					res.render('login', { 'errorMessage' : "dit brugernavn  eller adgangskode er forkert" });  
					return;	
				}else if(result.length == 1){
					if(bcrypt.compareSync(req.fields.passphrase, result[0].passphrase)){
						req.session.user = result[0].id;
						app.locals.username = result[0].username;
						req.session.roles_id = result[0].roles_id;
						req.session.level = result[0].level;
						app.locals.login = true;
						res.redirect('/dashborad');
					}else{
						res.render('login', {...req.fields, 'errorMessage' : "adgangskode er forkert" });  
						return;
					}
				}else{
					// elere bruger med samme loginoplysinger 
					res.render('login', {...req.fields, 'errorMessage' : "noget gik gal vi armejde på  sagen" });
				}			
			});
		}else{
			res.render('login',{errorMessage, ...req.fields});
			console.log(errorMessage);
		}
    });
	
/*------------------------------ this post is doing so the user can login  end --------------------------------------------*/



/*------------------------------ this route render the signup  ------------------------------------------------------------*/
    app.get('/signup', (req, res) => {
		res.render('signup');
    });

/*------------------------------ this post is doing so the user can signup ------------------------------------------------*/

    app.post('/signup', (req, res) => {
		let success = true;
		let errorMessage;
		db.query('SELECT username FROM users WHERE username = ?', [req.fields.username], (err, checkResults) => {
			if (checkResults.length > 0) {
				success = false;
				errorMessage = 'Brugernavn er taget';
			}
			if(!req.fields.username){
				success = false;
				errorMessage = 'feltet username er tomt';
			}
			if(!req.fields.passphrase){
				success = false;
				errorMessage = 'feltet passphrase er tomt';	
			}
            if(req.fields.passphrase  != req.fields.repeatpassphrase){
                success = false;
				errorMessage = 'password match ikkke';
            }
			if (!req.fields.username || !req.fields.passphrase) {
				success = false;
				errorMessage = 'Et eller flere felter var tomme';
			}

			if (success) {
                let hashedpassphrase = bcrypt.hashSync( req.fields.passphrase, 10);
				db.query('INSERT INTO users (username, passphrase, roles_id) VALUES (?, ?, 10);', [req.fields.username, hashedpassphrase], (err, results) => {
                    if (err) throw err;
                    console.log(results);
                    res.redirect('/login');
				});
			} else {
				res.render('signup', {...req.fields, errorMessage });
			}

		});
	});


/*------------------------------ this post is doing so the user can signup end ------------------------------------------------*/

/*------------------------------ this route is doing so the user can logout --------------------------------------------*/

	app.get('/logout', function (req, res) {
		req.session.destroy();
		app.locals.login = false;
		res.redirect('/');
	  });

/*------------------------------ this route is doing so the user can logout end --------------------------------------------*/ 
}