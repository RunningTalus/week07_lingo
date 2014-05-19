var usersModel = require('../models/users.js');
var dictionaryModel = require('../models/dictionary.js');

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
	checkAndSaveAnswer: function(req, res){
		// submit a question to the user's profile, return correct/incorrect
		// must submit: userId, langCodeAsked, wordIdAsked, langCodeAnswered, wordAnswered
		// returns: correct:Boolean, correctWord:String
		var result = {
				correct:false,
				correctWord:""
			};

		var translationData = {
			wordId: req.body.wordIdAsked,
			answer: req.body.wordAnswered,
			langCode: req.body.langCodeAnswered
		};

		var answer = {
			userId: req.body.userId,
			wordID: req.body.wordIdAsked,
			langFromCode: req.body.langCodeAsked, 
			langToCode: req.body.langCodeAnswered, 
			correct: false
		};

		dictionaryModel.checkTranslation(translationData, function(result){
			answer.correct = result.correct;
			res.send(result);
			userModel.saveAnswer(answer, function(){

			})
			
		});
		
	},
	saveQuiz: function(req, res){

	}
};
