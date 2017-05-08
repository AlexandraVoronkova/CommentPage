var express = require( 'express' );

function startApp(){
	var app = express();
	var comments = require('./routes/comments.js');
	app.use('./routes/comments.js', comments);
	app.get('/comments', comments);
	app.post('/comments', comments);
	
	app.listen(3000,function(){
		console.log('Work on port : 3000');
	});
}

var MongoClient = require('mongodb').MongoClient;
var Collection = require('mongodbext').Collection;

MongoClient.connect('mongodb://localhost:27017/chat',function(err, db){
		if (err) {
			console.error(err);
			return;
		}
		else{
			collection = db.collection('comments');
			startApp();
		}
	});

//var Step = require('twostep').Step;

/*Step(
	MongoClient.connect('mongodb://localhost:27017/chat'),
	function(err, db){
		if (err) {
			console.error(err);
			return;
		}
		else{
			collection = db.collection('comments');
			startApp();
		}
	}
);*/
