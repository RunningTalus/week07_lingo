var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var request = require('request');
var mongoose = require('mongoose');

var translationController = require('./controllers/translation.js');
//var quizController = require('./controllers/quiz.js');
var dictionaryController = require('./controllers/dictionary.js');
var usersController = require('./controllers/users.js');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/lingo');

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser());

app.get('/', function(req, res) {
	res.render('index');
});

app.get('/translation', function(req, res) {
	res.render('translation');
});

app.get('/quiz', function(req, res){
	res.render('quiz');
});

// Translate requested word 
app.get('/translation/translate', translationController.getTranslation);

// get all languages that can be translated from
app.get('/translation/languages/from', translationController.getFromLanguages);

// get all languages that can be translated to, given a language to translate from
// must submit: langCodeFrom:String
app.get('/translation/languages/to', translationController.getToLanguages);


// create a new user
// returns userId:Number
app.post('/users', usersController.createUser);

// submit a question to the user's profile, return corrct/incorrect
// must submit: userID, langCodeAsked, wordIdAsked, langCodeAnswered, wordAnswered
// returns: correct:Boolean, correctWord:String
app.post('/users/answer', usersController.submitAnswer);

//Save user's progress on last quiz
app.post('/users/quiz'), 

//


// get a random word from the dictionary
// must submit: langCode
// returns: wordId:Number, word:String
app.get('/dictionary/randomWord', dictionaryController.getRandomWord);

translationController.init(function(){
	dictionaryController.init(function(){
		usersController.init(function(){
			var server = app.listen(3444, function() {
				console.log('Express server listening on port ' + server.address().port);
			});
		})
	})
})

