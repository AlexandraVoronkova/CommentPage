'use strict';

var validate = require('../utils/validate'),
	_ = require('underscore');

module.exports = function(){
	return function(req, res, next){
		req.validate = function(schema, options){
			options = _({}).defaults(options, {
				reqFields: ['params', 'query', 'body']
			});

			var data = _(options.reqFields).reduce(function(data,field){
				return _(data).extend(req[field]);
			}, {});

			validate(
				data,
				{type: 'object', properties: schema},
				_(options).omit('reqFields')
				);

			return data;
		};
		next();
	};
};