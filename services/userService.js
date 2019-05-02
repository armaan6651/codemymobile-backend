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


exports.getUser = function (req) {
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
        var read_query = "SELECT * FROM `" + (TABLE_PREFIX + 'User') + "` LIMIT " + page_limit + " OFFSET " + offset;

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

exports.addUser = function (req) {
    return new Promise((resolve, reject) => {
        var keys = '';
        var values = '';
        Object.keys(req.body).forEach(function (key, index) {
            var val = req.body[key];
            keys += "`" + key + "`";
            values += mysql_clean(val);
            if (Object.keys(req.body).length != (index + 1)) {
                keys += ',';
                values += ',';
            }
        });
        sequelize.query("INSERT INTO `" + (TABLE_PREFIX + "User") + "` (" + keys + ") VALUES (" + values + ")", {
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