var dictionary = require('./dictionary.js');

module.exports = {
	init: function(){
		dictionary.init();
		created = true;
	},
	getQuestion: function(userID){
		dictionary.getQuestion();
		return word;
	},
	start: function(userID, langTo, langFrom){
		
	},
	checkAndSaveAnswer:function(userID, langFrom, langTo, wordFromID, answer){
		return "correct";
	}

}