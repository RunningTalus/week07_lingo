quizModel = require('../models/quiz.js');

quizModel.init(function(){
	quizModel.getRandomWord("fra", function(err,word){
		
	});
});



module.exports = {
	quiz: function(req, res){
		// console.log("Quiz controller is up");
		res.render('quiz');
	},
	createQuestion: function(req, res){
		//logs to terminal console
		// console.log(req.body.langTo, req.body.langFrom);

		var sendData = {wordId: 1, wordFrom: "Hundred", wordTo: "Cien"};
		res.send(sendData);
	}
};