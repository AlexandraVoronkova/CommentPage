 'use strict';
 var config = require('../config.json');

 var Client = require('mongodb').MongoClient,
    _ = require('underscore');
 
 var collections = [
    'comments'
    ];
 
exports.collections = {};
 
exports.init = function(callback) { 
    Client.connect('mongodb://' + config.db.host + ':' + config.db.port + '/' + config.db.name, function(err, db) { 
        _(collections).each(function(colName) {
            // получаем модуль каждой коллекции
            var module = require('./' + colName);
            // экспортируем коллекцию, при этом создав ее
            exports[colName] = exports.collections[colName] = module.create(db);
        });
        callback(err, db);
    });
};