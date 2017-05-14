'use strict';
var express = require( 'express' );
var router = express.Router();
var bodyParser = require ( 'body-Parser' );
var db=require('../db');

module.exports = function(router){
	//Обработчик '/comments'
	router.get('/comments', function(req, res,next) {
		db.comments.find({}).toArray(function(err, comments) {
			res.render('index.jade',{comments:comments});
		});
	});

	router.use( bodyParser.urlencoded({extended: true}) );
	router.use( bodyParser.json());
	//обработчик получения данных
	router.post('/comments', function(req, res) {
		//получаем переменные с данными из формы /comment
		var name=req.body.name; 
		var comment=req.body.comment;
		//добавление комментария в БД
		var newComment = {name: name, comment:comment, date: new Date()};
		db.comments.insertOne(newComment, function(err){
			if (err) {
				throw err;
			} else {
				res.redirect('/comments')
			}
		});
	});
}