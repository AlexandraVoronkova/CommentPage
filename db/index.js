 'use strict';
 var Client = require('mongodb').MongoClient,
    _ = require('underscore');
 
 var collections = [
    'comments'
    ];
 
exports.collections = {};
 
exports.init = function(callback) { 
    Client.connect('mongodb://localhost:27017/chat', function(err, db) {
        _(collections).each(function(colName) {
            // получаем модуль каждой коллекции
            var module = require('./' + colName);
            // экспортируем коллекцию, при этом создав ее
            exports[colName] = exports.collections[colName] = module.create(db);
        });
        callback(err, db);
    });
};