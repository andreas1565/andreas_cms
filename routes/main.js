const db = require('../config/mysql')();

module.exports = function (app) {
    app.get('/', (req, res, next) => {
        db.query('SELECT  id, name, postion FROM menu ORDER BY postion ASC', (err, menuresults) => {
            if (err) return next(`${err} at db.query (${__filename}:5:9)`);

            db.query('SELECT id, title,image ,description FROM article', (err, results) => {
                if (err) throw err;
                res.render('index', { 'menuresults': menuresults, 'results': results });
            })
        });
    });

    app.get('/category/:id', (req, res) => {
        db.query('SELECT  id, name, postion FROM menu ORDER BY postion ASC', (err, menuresults) => {
            if (err) return next(`${err} at db.query (${__filename}:5:9)`);

            db.query('SELECT title,  image,  description, menu.name   FROM news.article INNER JOIN menu ON fk_menu = menu.id WHERE fk_menu = ? ', [req.params.id], (err, results) => {
                if (err) throw err;
                res.render('index', { 'menuresults': menuresults, 'results': results });
            })
        });
    })
}