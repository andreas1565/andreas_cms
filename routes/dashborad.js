const db = require('../config/mysql')();
const fs = require('fs');
const checkrole = require('../middleware/role-check');
module.exports = function (app) {
    // hvis checkrole  fucktion er retuneer next hvis dette route
    app.get('/dashborad', [checkrole.admins, checkrole.superadmins, checkrole.moderators], (req, res) => {
        res.render('dashborad/dashborad')
    })
}