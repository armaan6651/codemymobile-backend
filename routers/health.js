var express = require('express');

module.exports = function (app) {
    var router = express.Router();

    router.get('/', (req, res, next) => {
        res.json({
            status: 'UP'
        });
    });

    app.use("/health", router);
}