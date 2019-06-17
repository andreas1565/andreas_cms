const formidadble = require('express-formidable');
module.exports = function (app) {
    app.use(formidadble());
}
