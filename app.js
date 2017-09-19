'use strict';
var reqValidate = require('./middleware/reqValidate');
var express = require('express');
var port = require('./config.json').port;
var bodyParser = require('body-parser');

function startApp() {
	var app = express();

	app.use(reqValidate());
	var router = require('./routes');
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(router);

	app.listen(port,function() {
		console.log('Work on port : ', port);
	});
}

var db = require('./db');
db.init(function(err) {
	if (err) {
            throw err;
        } else {
            startApp();
        }
})