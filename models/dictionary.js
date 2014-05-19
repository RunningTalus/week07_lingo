// need to use async
// need to add words to dictinoary

var mongoose = require('mongoose');
var fs = require('fs');
var async = require('async');
var _ = require('underscore');

var translation = require('./translation.js');


var Word = mongoose.model('Word',
    {
    	translations:[
    		{
    			langCode:String, 
    			word:String
    		}
    	]
    }
);

var DictionaryDB = mongoose.model('Dictionary',
	{name:String,
	initialized: Boolean,
	words:[mongoose.Schema.Types.ObjectId]
	}
);

var dictionaryDB = {initialized:false};

var Dictionary = {

	init: function(callback){
		// Check for dictionary in database.  If there, use it, if not, make it 
		// with 1000 popular english words to start
		translation.init(function(){
			DictionaryDB.findOne({name:"Lingo"}, function(err,data){
				if (data){
					// found a dictionary, let's use it
					dictionaryDB = data;
					console.log("Dictionary initialized.");
					callback(err, null);
				}
				else {
					// no dictionary in database, gotta make one
					console.log("Creating dictionary");	
					dictionaryDB = new DictionaryDB({name:"Lingo",initialized:false});

					fs.readFile('./json/1000-words.json', 'utf-8', function(err, readData){
						var english = JSON.parse(readData);
						// get rid of any words that might be lying around in the database
						Word.remove({}, function(err){
							// add word creation to async
							var asyncTasks = [];
							english.words.map(function(engWord){
								asyncTasks.push(function(asyncDone){
									var word = new Word({translations:[{langCode:"eng",word:engWord}]});
									dictionaryDB.words.push(word);
									word.save(asyncDone());			
								})
							});	
							// kick off async tasks, and save dictionary when done
							async.parallel(asyncTasks, function(){	
									console.log("Dictionary initialized.");					
									dictionaryDB.initialized = true;
									dictionaryDB.save(callback);
									
								});	
						})	
					})

				}
			});
			
		})	
	},
	getRandomWord:function(langCode, callback){
		// returns a random word from the dictionary in the language specified by langCode
		// Callback returns (err, {word:word, wordId:wordId});
		var returnWord = {word:"", wordId:0};
		if (!dictionaryDB.initialized) new Error("Must initialize Dictionary before initializing.");
		// Pick a random word from the dictionary, and fetch it from the words database
		Word.findById(_.sample(dictionaryDB.words), function(err,dbWord){		
			// loop through the languages already translated for the word 
			// looking for the language requested
			returnWord.wordId = dbWord._id;
			for (var i = 0; i<dbWord.translations.length; i++){
				if (dbWord.translations[i].langCode === langCode){
					returnWord.word = dbWord.translations[i].word;
					//console.log("Found word in dictionary");
					callback(err, returnWord);
					
				}
			}
			// Couldn't find desired translation for the word, so we need to go fetch one
			if (!returnWord.word){
				//console.log("Looking up word: ", );
				var translationData = {
					// the first translation in the translation list is English, which we need to do the translation
					// kind of a hack
					wordFrom:dbWord.translations[0].word,
					langFromCode:'eng',
					langToCode:langCode
				}
					// go fetch the translation from the translation model
				translation.getTranslation(translationData, function(err, transWord){
					returnWord.word = transWord;
					dbWord.translations.push({langCode: langCode, word:transWord});
					dbWord.save(function(){
						callback(err, returnWord);
					});
					
				})
			}
		});
	},
	checkTranslation: function(answer, callback){
		// translation takes the form {wordID, answer, langCode}
		if (!dictionaryDB.initialized) new Error("Must initialize Dictionary before initializing.");
		// Looks up word with wordID and checks that "word" matches
		// in the language given by "langCode"
		return true;
	}
	
} 

module.exports = Dictionary;
