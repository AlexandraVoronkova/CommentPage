'use strict';

var conform = require('conform');
var _ = require('underscore');

module.exports = function(data, schema, options) {
	conform.validate(data, schema, _.defaults({},options,{
		cast:true,//Enforce casting of some types
		castSource: true,
		additionalProperties: false,//Default value for object 
		applyDefaultValue: true,
		failOnFirstError: true// property info of error will contain regular validation error information
	}));

	return data;
};