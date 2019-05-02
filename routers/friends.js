var express = require('express');
var friendsService = require('../services/friendsService');

module.exports = (function (app) {
    var router = express.Router();

    // fetch all users
    router.get('/:userId?', function (req, res) {
        if (req.params.userId) {
            friendsService.getFriendsByUser(req).then((data) => {
                res.status(200);
                res.send(data);
            }).catch((data) => {
                res.status(404);
                res.send(data);
            });
        } else {
            friendsService.getFriends(req).then((data) => {
                res.status(200);
                res.send(data);
            }).catch((data) => {
                res.status(404);
                res.send(data);
            });
        }
    });

    // fetch friends of friends
    router.get('/fof/:userId', function (req, res) {
        if (req.params.userId) {
            friendsService.getFriendsOfFriends(req).then((data) => {
                res.status(200);
                res.send(data);
            }).catch((data) => {
                res.status(404);
                res.send(data);
            });
        } else {
            res.status(500);
            res.send("userId not found");
        }
    });

    // add a new friend
    router.post('/', function (req, res) {
        if (JSON.stringify(req.body) == '{}') {
            res.status(404);
            res.json({
                "success": 0,
                "message": "Parameters missing"
            });
            return false;
        }

        friendsService.addFriend(req).then((data) => {
            res.status(201);
            res.send(data);
        }).catch((data) => {
            res.status(500);
            res.send(data);
        });
    });

    app.use("/friends", router);
});