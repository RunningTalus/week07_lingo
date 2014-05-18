quizModel = require('../models/quiz.js');

quizModel.init(function(){
	quizModel.getRandomWord("fra", function(err,word){
		
	});
});



module.exports = {
	quiz: function(req, res){
		console.log("Quiz controller is up");

	}
};