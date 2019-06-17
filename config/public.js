const express = require('express');
module.exports = function (app) {
    app.use(express.static('./public')); // Where are static files located
}