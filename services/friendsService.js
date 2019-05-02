'use strict';

var Sequelize = require('sequelize');
var config = require('../config');

//Initialize database
var sequelize = new Sequelize(config.database, config.username, config.password);
var TABLE_PREFIX = config.table_prefix;

//Pagination settings
var paginate = config.paginate;
var page_limit = config.page_limit;

var mysql_clean = function (string) {
    return sequelize.getQueryInterface().escape(string);
};

exports.getFriends = function (req) {
    return new Promise((resolve, reject) => {
        var page = 1;
        if (req.query.page)
            page = req.query.page;
        var offset = (page - 1) * page_limit;

        //Calculate pages
        var next = Number(page) + 1;
        if (page != 1)
            var previous = Number(page) - 1;
        else
            var previous = Number(page);
        var read_query = "SELECT * FROM `" + (TABLE_PREFIX + 'Friends') + "` LIMIT " + page_limit + " OFFSET " + offset;

        sequelize.query(read_query, {
                type: sequelize.QueryTypes.SELECT
            })
            .then(function (rows) {
                if (!rows.length) {
                    var response ={
                        "success": 0,
                        "data": "No rows found"
                    };
                    resolve(response);
                }
                if (!next) {
                    var response = {
                        "success": 1,
                        "data": rows
                    };
                    resolve(response);
                } else
                    var last = Math.ceil(rows.length / page_limit);
                var response = {
                    "success": 1,
                    "data": rows,
                    "pages": {
                        "next": next,
                        "previous": previous,
                        "last": last
                    }
                };
                resolve(response);
            })
            .catch(function (err) {
                var response = {
                    "success": 0,
                    "message": err.message
                };
                reject(response);
            });
    });
}

exports.getFriendsByUser = function (req) {
    return new Promise((resolve, reject) => {
        var page = 1;
        if (req.query.page)
            page = req.query.page;
        var offset = (page - 1) * page_limit;

        //Calculate pages
        var next = Number(page) + 1;
        if (page != 1)
            var previous = Number(page) - 1;
        else
            var previous = Number(page);

        // var read_query = "SELECT  f1.userOne, f2.userTwo as friend_of_friend FROM friends f1, friends f2 WHERE f1.userOne = '" +  req.params.userId + "' AND f1.userTwo = f2.userOne AND f1.userOne <> f2.userTwo" + " LIMIT " + page_limit + " OFFSET " + offset;
        var read_query = "SELECT * FROM `Friends` AS F , `User` AS U WHERE CASE WHEN F.userOne = '" + req.params.userId + "' THEN F.userTwo = U.email END"


        sequelize.query(read_query, {
                type: sequelize.QueryTypes.SELECT
            })
            .then(function (rows) {
                if (!rows.length) {
                    var response = {
                        "success": 0,
                        "data": "No rows found"
                    };
                    resolve(response);
                }
                if (!next) {
                    var response = {
                        "success": 1,
                        "data": rows
                    };
                    resolve(response);
                } else
                    var last = Math.ceil(rows.length / page_limit);
                var response = {
                    "success": 1,
                    "data": rows,
                    "pages": {
                        "next": next,
                        "previous": previous,
                        "last": last
                    }
                };
                resolve(response);
            })
            .catch(function (err) {
                var response = {
                    "success": 0,
                    "message": err.message
                };
                reject(response);
            });
    });
}


exports.getFriendsOfFriends = function (req) {
    return new Promise((resolve, reject) => {
        var page = 1;
        if (req.query.page)
            page = req.query.page;
        var offset = (page - 1) * page_limit;

        //Calculate pages
        var next = Number(page) + 1;
        if (page != 1)
            var previous = Number(page) - 1;
        else
            var previous = Number(page);

        var read_query = "SELECT  f1.userOne, f2.userTwo as friend_of_friend, u.* FROM friends f1, friends f2, User u WHERE f1.userOne = '" +  req.params.userId + "' AND f1.userTwo = f2.userOne AND f1.userOne <> f2.userTwo AND f2.userTwo = u.email " + " LIMIT " + page_limit + " OFFSET " + offset;

        sequelize.query(read_query, {
                type: sequelize.QueryTypes.SELECT
            })
            .then(function (rows) {
                if (!rows.length) {
                    var response = {
                        "success": 0,
                        "data": "No rows found"
                    };
                    resolve(response);
                }
                if (!next) {
                    var response = {
                        "success": 1,
                        "data": rows
                    };
                    resolve(response);
                } else
                    var last = Math.ceil(rows.length / page_limit);
                var response = {
                    "success": 1,
                    "data": rows,
                    "pages": {
                        "next": next,
                        "previous": previous,
                        "last": last
                    }
                };
                resolve(response);
            })
            .catch(function (err) {
                var response = {
                    "success": 0,
                    "message": err.message
                };
                reject(response);
            });
    });
}

exports.addFriend = function (req) {
    return new Promise((resolve, reject) => {
        var keys = '';
        var values = '';
        var valuesRev = '';
        Object.keys(req.body).forEach(function (key, index) {
            var val = req.body[key];
            keys += "`" + key + "`";
            values += mysql_clean(val);
            valuesRev = mysql_clean(val).concat(',', valuesRev);
            if (Object.keys(req.body).length != (index + 1)) {
                keys += ',';
                values += ',';
            }
        });

        sequelize.query("INSERT INTO `" + (TABLE_PREFIX + "Friends") + "` (" + keys + ") VALUES (" + values + ") , (" + valuesRev.substring(0, valuesRev.length-1) + ")"
        ,  {
                type: sequelize.QueryTypes.INSERT
            })
            .then(function (id) {
                var response = {
                    "success": 1,
                    "id": id
                };
                resolve(response);
            })
            .catch(function (err) {
                var response = {
                    "success": 0,
                    "message": err.message
                };
                reject(response);
            });
    });
}