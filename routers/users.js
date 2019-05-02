var express = require('express');
var userService = require('../services/userService');

module.exports = (function (app) {

    var router = express.Router();

    // fetch all users
    router.get('/', function (req, res) {
        userService.getUser(req).then((data) => {
            res.status(200);
            res.send(data);
        }).catch((data) => {
            res.status(404);
            res.send(data);
        });
    });

    // add a new user
    router.post('/', function (req, res) {
        if (JSON.stringify(req.body) == '{}') {
			res.status(404);
			res.json({
				"success": 0,
				"message": "Parameters missing"
			});
			return false;
        }
        
        userService.addUser(req).then((data) => {
            res.status(201);
            res.send(data);
        }).catch((data) => {
            res.status(500);
            res.send(data);
        });
    });

    app.use("/users", router);
});