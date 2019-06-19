const db = require('../config/mysql')();
const checkrole = require('../middleware/role-check');
module.exports = function (app) {
     /*------------------------------ //delete session this route rote is for delte a  session  fetback---------------------------------------------------*/  
   app.get('/dashborad/menu/session',  [checkrole.admins, checkrole.superadmins, checkrole.moderators], (req,res) =>{   
    let fetback;
    delete req.session.fetback;
    db.query('SELECT  id, name, postion FROM news.menu ORDER BY postion ASC',  function(err ,results){
        res.render('dashborad/menu', {results, fetback, userlevel: req.session.level});
    });
   });
    /*------------------------------ this route rote is for delte a  session  fetback end---------------------------------------------------*/ 
    /*select all menu from the  database*/
    app.get('/dashborad/menu',  [checkrole.admins, checkrole.superadmins, checkrole.moderators], (req, res) => {
        let fetback;
        if(typeof req.session.fetback !== 'undefined'){
            fetback = req.session.fetback;
            console.log(req.session.fetback);
        }
        db.query('SELECT  id, name, postion FROM news.menu ORDER BY postion ASC', function (err, results) {
            res.render('dashborad/menu', { 'results': results, fetback, userlevel: req.session.level })
        })
    })
    /* create a menu*/
    app.get('/dashborad/menu/create',  [checkrole.admins, checkrole.superadmins, checkrole.moderators], function (req, res) {
        res.render('dashborad/menu_new')
    })

    app.post('/dashborad/menu/create',  [checkrole.admins, checkrole.superadmins, checkrole.moderators], function (req, res) {
        let success = true;
        let errorMessage;
        req.session.fetback = 'du har oprate et nyt menupunkt';
        if (req.fields.name === "" || req.fields.postion === '') {
            success= false;
            errorMessage = 'en eller  et felet er tomet';
        }
        if(req.fields.name  === ''){
            success= false;
            errorMessage = 'feltte navn er tomt';
        }
        if(req.fields.postion === ''){
            success= false;
            errorMessage = 'feltte tomt er tomt';
        }
        if(isNaN(req.fields.postion)){
            success = false;
            errorMessage.push('du kan kun skrive tal i postion feltet');
        }
        if(success){
            db.query('INSERT INTO `news`.`menu` (`name`, `postion`) VALUES (?, ?);', [req.fields.name, req.fields.postion], function (err, results) {
                if (err) throw err;
                res.redirect('/dashborad/menu');
            });
        }else{
            res.render('dashborad/menu_new', {errorMessage, ...req.fields})
        }
       
    });

    /* create a menu end*/
    /* update menu*/
    app.get('/dashborad/menu/edit/:id',  [checkrole.admins, checkrole.superadmins, checkrole.moderators], function (req, res) {
        let id = req.params.id;
        db.query('SELECT name, postion, id FROM menu WHERE id = ?', [id], function (err, results) {
            if (err) throw err;
            res.render('dashborad/menu_update', { 'results': results[0] });
        });
    });

    app.patch('/dashborad/menu/',  [checkrole.admins, checkrole.superadmins, checkrole.moderators], function (req, res) {
        let id = req.fields.id;
        const name = req.fields.name;
        const postion = req.fields.postion;
        req.session.fetback = 'du har  opdatert et menupunkt';
        let success = true;
		let errorMessage;
        if (req.fields.name === "" || req.fields.postion === '') {
            success= false;
            errorMessage = 'en eller  et felet er tomet';
        }
        if(req.fields.name  === ''){
            success= false;
            errorMessage = 'feltte navn er tomt';
        }
        if(req.fields.postion === ''){
            success= false;
            errorMessage = 'feltte tomt er tomt';
        }
        if(success){
            db.query(`UPDATE menu SET name = ?, postion = ?  WHERE id =?`, [name, postion, id], function (err, results) {
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
    /* update menu end*/
    /* deltea menu*/
    app.delete('/dashborad/menu/:id',  [checkrole.admins, checkrole.superadmins], function (req, res, next) {
        if(req.session.level == 100 || req.session.level == 110){
            let id = req.params.id;
        db.query(`DELETE menu FROM menu
        WHERE id = ?`, [id], function (err, results) {
                if (err) return next(err);
                res.status(200);
                res.end();
            });
        }  else{
            res.status(401); // Unauthorized
            res.end(); 
        }
    });
    /* deltea menu end*/
}