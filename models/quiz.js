var dictionary = require('./dictionary.js');

module.exports = {
	init: function(callback){
		dictionary.init(callback);
	},
	getRandomWord: function(langKey, callback){
		dictionary.getRandomWord(langKey, callback);
	},
	start: function(userID, langTo, langFrom){

	},
	checkAndSaveAnswer:function(userID, langFrom, langTo, wordFrom, answer){
		return "correct";
	}
	

}