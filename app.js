'use strict';
var express = require( 'express' );
var port = require('./config.json').port;
function startApp(){
	var app = express();
	var routes = require('./routes');
	app.use(routes);

	app.listen(port,function(){
		console.log('Work on port : ',port);
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