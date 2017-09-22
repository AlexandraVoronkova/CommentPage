'use strict';
var express = require('express');
var router = express.Router();
var db=require('../db');
var Steppy = require('twostep').Steppy;

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
	router.get('/comments', 
		function(req, res, next) { 
			Steppy(
				function() {
					db.comments.find({}).toArray(this.slot());
				},
				function(err, comments) {
					res.render('index.jade', {comments: comments});
					this.pass(null);
				},
				next
			);
		}
	);
	
	//обработчик получения данных
	router.post('/comments',
		function(req, res, next) {
			Steppy(
				function() {
					var params = req.validate(schema);
					//добавление комментария в БД
					db.comments.insertOne(params,this.slot());
				},
				function(err) {
					res.redirect('/comments');
					this.pass(null);
				},
				next
			);
		}
	);
}