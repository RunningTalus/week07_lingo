var usersModel = require('../models/users.js');

var Users = module.exports = {
	init: function(callback){
		usersModel.init(callback);
	},
	createUser: function(req, res){
		var userName = req.body.userName;
		usersModel.createUser(userName, function(userId){
			res.send({userId:userId});
		});
	},
	submitAnswer: function(req, res){
		// submit a question to the user's profile, return corrct/incorrect
		// must submit: userID, langCodeAsked, wordIdAsked, langCodeAnswered, wordAnswered
		// returns: correct:Boolean, correctWord:String

	}
}
