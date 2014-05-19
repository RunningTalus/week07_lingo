

var mongoose = require('mongoose');
var _ = require('underscore');


var Answer = mongoose.model('Answer',
	{
		wordId: String,
		langFromCode: String,
		langToCode: String,
		numCorrect: Number,
		numAsked: Number
	}
)

var User = mongoose.model('User',
    {	
    	name: String,
    	userId : Number,
    	answers: [Answer]
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
		})	
	},
	saveAnswer: function(answer, callback){
		// answer takes the form {userId, wordID, langFromCode, langToCode, correct}
		// need to go find the user
		// need to create an answer, and push onto the user's answer list
		// then save user 

		callback();
	}
};
