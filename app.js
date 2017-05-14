'use strict';
var express = require( 'express' );

function startApp(){
	var app = express();
	var routes = require('./routes');
	app.use(routes);
	
	app.listen(3000,function(){
		console.log('Work on port : 3000');
	});
}

var db = require('./db');
db.init(function(err){
	if (err) {
            throw err;
        } else {
            startApp();
        }
})