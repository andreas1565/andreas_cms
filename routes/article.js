const db = require('../config/mysql')();
const fs = require('fs');
const checkrole = require('../middleware/role-check');
module.exports = function(app){
    /*------------------------------ //delete session this route rote is for delte a  session  fetback---------------------------------------------------*/  
   app.get('/dashborad/article/session',  [checkrole.admins, checkrole.superadmins, checkrole.moderators], (req,res) =>{   
    let fetback;
    delete req.session.fetback;
    db.query('SELECT id, title, image, description FROM article',  function(err ,results){
        res.render('dashborad/article', {results, fetback, userlevel: req.session.level});
    });
   });
    /*------------------------------ this route rote is for delte a  session  fetback end---------------------------------------------------*/ 

    /*select all article from the  database*/
    app.get('/dashborad/article',   [checkrole.admins, checkrole.superadmins, checkrole.moderators], function (req, res) {
        let fetback;
        if(typeof req.session.fetback !== 'undefined'){
            fetback = req.session.fetback;
            console.log(req.session.fetback);
        }
        db.query(`SELECT id, title, image, description FROM article`, function (err, results) {
            if (err) throw err;
            res.render('dashborad/article', { 'results': results , fetback, userlevel: req.session.level});
        });
    });
    /*select all article from the  database*/

    /*create a new articel*/
    app.get('/dashborad/article/create',  [checkrole.admins, checkrole.superadmins, checkrole.moderators], function (req, res) {
        
        db.query('SELECT id, name FROM menu', function (err, results) {
            if (err) throw err;
            const menus = results;
            res.render('dashborad/article_new', { menus })
        })
    });
    app.post('/dashborad/article/create',  [checkrole.admins, checkrole.superadmins, checkrole.moderators], function (req, res, next) {
        let success = true;
        let errorMessage;
        req.session.fetback = 'du har oprate en ny artickle';
        if (req.fields.title === "" || req.files.image === '' || req.fields.description === '') {
            success= false;
            errorMessage = 'en eller  et felet er tomet';
        }
         if (!req.files || !req.files.image) {
            return next(new Error('der var ingen fil med formularen...'));
        }
       // console.log(req.files.image.type);
        if (req.files.image.type.indexOf('image') === -1) {
			errorMessage = 'du har ikke valgt en korat fil type';
			success = false;
        }
        if(req.files.image.size > process.env.max_file_upload){
            errorMessage = 'filen må max fulde 2mb';
			success = false;
        }
        if(req.files.image.name === ''){
            errorMessage = 'der er igen file med formular';
			success = false; 
        }
        if(req.fields.description === ''){
            errorMessage = 'felte beskrive er  tomt';
			success = false; 
        }
        if (!req.fields.menu || isNaN(req.fields.menu) || req.fields.menu == "0") {
            success = false;
            errorMessage.push('vælg en salg');
        }
        if(req.fields.description[0] == " "){
            while(req.fields.description[0] === " ") {
                req.fields.description = req.fields.description.slice(1);
            }
            success = false;
            errorMessage.push('ingen mellemrum');
        }
         if(success === true){
            fs.readFile(req.files.image.path, function (err, data) {
                if (err) {
                    return next(new Error('den midlertidige fil  kunne ikke læses'));
                }
                const date = new Date().getTime();
                const newFilename = `${date}${req.files.image.name}`;
                const newFilePath = `./public/media/${newFilename}`;
                fs.renameSync(req.files.image.path, newFilePath);
    
                fs.writeFile(newFilePath, data, (err) => {
                    if (err) {
                        return next(new Error('filen kunne  ikke gemmes.'));
                    }
                    // console.log(req.fields);
    
                    db.query(`INSERT INTO article (title, image, description, fk_menu) VALUES (?, ?, ?, ?);`, [req.fields.title, newFilename, req.fields.description, req.fields.menu], function (err) {
                        if (err) {
                            return next(new Error('filen kunne  ikke gemmes i databasen:' + err));
                        } else {
                            res.redirect('/dashborad/article')
                        }
                    })
                })
    
    
            });
        }else{
            db.query('SELECT id, name FROM menu',  [checkrole.admins, checkrole.superadmins, checkrole.moderators], (err, results) =>{
                if(err) throw err;
                const menus = results;
                res.render('dashborad/article_new', {...req.fields, ...req.files, errorMessage, menus});
            })
        }
    });
    /*create a new article end*/

    /*updaing the article*/
    app.get('/dashborad/article/:id',  [checkrole.admins, checkrole.superadmins, checkrole.moderators], function  (req, res) {
        let id = req.params.id;
        db.query(`SELECT id, title, image, description, fk_menu FROM article WHERE id = ?`, [id], function (err, results) {
            const currents = results;
            if (err) throw err;
            db.query('SELECT id,  name FROM news.menu  ', function (err, results) {
                if (err) throw err;
                const menus = results;
                res.render('dashborad/article_update', { currents, menus });
            })

        })

    })
/*     app.patch('/dashborad/article/:id', function (req, res, next) {
        let id = req.params.id;
        let success = true;
        let errorMessage;
        console.log( req.files.image.name);
        if (req.fields.title === "" || req.fields.description == '') {
            success= false;
            errorMessage = 'en eller  et felet er tomet';
        }
        if(req.files.image.name){
            success= false;
            errorMessage = 'der er ikke nopget bilde';
        }
        if(success){
            if (req.files.image) {
                fs.readFile(req.files.image.path, function (err, data) {
                    if (err) {
                        return next(new Error('den midlertidige fil  kunne ikke læses'));
                    }  
                    const date = new Date().getTime();
                    const newFilename = `${date}${req.files.image.name}`;
                    const newFilePath = `./public/media/${newFilename}`;
                    fs.renameSync(req.files.image.path, newFilePath);
                    if(req.files.image.name){
                        console.log(`*** ${req.files.name}`);
                        fs.unlink(`./public/media/${req.fields.oldimage}`, function (err, data) {
                            if (err) throw err
                        });
                    }
    
                    fs.writeFile(newFilePath, data, (err) => {
                        if (err) {
                            return next(new Error('filen kunne  ikke gemmes.'));
                        }
                      
                            
                            fs.unlink(`./public/media/${req.fields.oldimage}`, function (err, data) {
                                if (err) throw err
        
                            });
                       
                        
    
                        //console.log(req.fields);
    
                        db.query(`UPDATE article SET title = ?, image = ?, description = ?, fk_menu = ? WHERE id = ?`, [req.fields.title, newFilename, req.fields.description, req.fields.menu, id], function (err) {
                            if (err) {
                                return next(new Error('filen kunne  ikke gemmes i databasen:' + err));
                            } else {
                                res.redirect('/dashborad/article/')
                            }
                        })
                    })
                });
            } // if (req.files.newFile)
            //res.send(req.fields, req.files);
        }else{
            //res.status('400');
            res.json({errorMessage  });
        }
       
    }); */
    app.patch('/dashborad/article/:id',  [checkrole.admins, checkrole.superadmins, checkrole.moderators], function (req, res) {
        let id = req.params.id;
        req.session.fetback = 'du har opdatert en artikle';
        let success = true;
		let errorMessage;
        if (req.fields.title === "" || req.fields.description === '') {
            success= false;
            errorMessage = 'en eller  et felet er tomet';
        }
        if(req.fields.title === ''){
            success= false;
            errorMessage = 'feltet title er tomet';  
        }
        if(req.fields.description === ''){
            success= false;
            errorMessage = 'feltet description er tomet';  
        }
        if (!req.fields.menu || isNaN(req.fields.menu) || req.fields.menu == "0") {
            success = false;
            errorMessage ='vælg et menupunkt'
        }
        if(req.fields.description[0] == " "){
            while(req.fields.description[0] === " ") {
                req.fields.description = req.fields.description.slice(1);
            }
            success = false;
            errorMessage = 'ingen mellemrum';
        }
        if(success){
            db.query(`UPDATE article SET title = ?,  description = ?, fk_menu = ? WHERE id = ?`, [req.fields.title,  req.fields.description, req.fields.menu, id], function (err, results) {
                if (err) {
                    throw err;
                }
    
                res.json({ successful: true })
            }) 
        }else{
            res.status('400');
            res.json({errorMessage  }) 
        }
        
    });

    app.patch('/dashborad/article/image/:id',  [checkrole.admins, checkrole.superadmins, checkrole.moderators], (req, res, next) => {
		const file = req.files.photo;
		const renamedFilename = `${Date.now()}_${file.name}`;
		let success = true;
		let errorMessage;

		/* console.log(file); */
		if (file.type.indexOf('image') === -1) {
			errorMessage = 'du har ikke valgt en korat fil type';
			success = false;
        }
        if(file.size > process.env.max_file_upload){
            errorMessage = 'filen må max fulde 2mb';
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
                const sql = 'SELECT  image FROM article WHERE id = ?';
                db.query(sql, [req.params.id], (err, results) => {
                    fs.unlink(`./public/media/${results[0].image}`, function (err, data) {
                        if (err) throw err

                    });
                });
				if (err) return next(`${err} at fs.writeFile (${__filename}:37:7)`);
				db.query('UPDATE article SET image = ?  WHERE id = ?', [renamedFilename, req.params.id], (err, result) => {
					if (err) return next(`${err} at db.query (${__filename}:39:9)`);
					res.status(200);
						res.json({
							photo: renamedFilename
						});
				});
			});
		});

	});

    /*delete articel*/
    app.delete('/dashborad/article/:id',  [checkrole.admins, checkrole.superadmins], function (req, res) {
        if(req.session.level == 100 || req.session.level == 110){
            let id = req.params.id;
            db.query(`SELECT image FROM article WHERE id = ?`, [id], function (err, data) {
                if (err) {
                    throw err;
                }
                console.log(data[0].image);
                fs.unlink(`./public/media/${data[0].image}`, function (err, data) {
                    if (err) throw err
    
                });
                db.query(`DELETE FROM article WHERE id = ?`, [id], function (err, data) {
                    if (err) throw err;
                    res.status(200);
                    res.end();
                })
            });
        } else{
            res.status(401); // Unauthorized
            res.end();  
        }
    });
    /*delete article end*/
}