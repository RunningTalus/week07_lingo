var dictionary = require('./dictionary.js');

module.exports = {
	init: function(callback){
		dictionary.init(callback);
	},
	getRandomWord: function(langCode, callback){
		dictionary.getRandomWord(langCode, callback);
	},
	start: function(userID, langToCode, langFromCode){
		
	},
	checkAndSaveAnswer:function(userID, langFromCode, langToCode, wordFrom, answer){
		return "correct";
	}
	

};