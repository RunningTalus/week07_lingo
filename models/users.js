

var mongoose = require('mongoose');
var _ = require('underscore');

var User = mongoose.model('User',
    {	
    	name: String,
    	userId : Number
    }
);

var userId = 0;

var Users = module.exports = {
	init: function(callback){
		callback(null, null);
	},
	getUser: function(userId, callback){

	},
	createUser: function(userName, callback){
		user = new User(
			{
				name:userName,
				userId: userId++
			}
		);
		user.save(function(err){
			callback(err,user.userId);
		});	
	}
};