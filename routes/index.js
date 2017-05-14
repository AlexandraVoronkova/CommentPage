'use strict';
var _ = require('underscore'),
	express = require('express');

var router = express.Router({mergeParams:true})

var routes = ['comments'];

_(routes).each(function(route) {
	require('./' + route)(router);//require(route) возвращает функцию function(router)
});

module.exports = router;//возвращаем router, чтобы потом использовать его в app