'use strict';
var express = require('express');
var router = express.Router();
var db=require('../db');

var schema = {
	name: {
		type:'string',
		required: true
	},
	comment: {
		type:'string',
		required: true
	},
	date: {
		type: 'date',
		default: new Date()
	}
};

module.exports = function(router) {
	//Обработчик '/comments'
	router.get('/comments', function(req, res,next) {
		db.comments.find({}).toArray(function(err, comments) {
			res.render('index.jade',{comments: comments});
		});
	});
	
	//обработчик получения данных
	router.post('/comments', function(req, res) {
		var params = req.validate(schema);
		//добавление комментария в БД
		db.comments.insertOne(params, function(err) {
			if (err) {
				throw err;
			} else {
				res.redirect('/comments')
			}
		});
	});
}