// need to use async
// need to add words to dictinoary

var mongoose = require('mongoose');
var fs = require('fs');
var async = require('async');
var _ = require('underscore');

var translation = require('./translation.js');

mongoose.connect('mongodb://localhost/lingo');

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

var Dictionary = module.exports = {

	init: function(callback){
		// Check for dictionary in database.  If there, use it, if not, make it 
		// with 1000 popular english words to start
		translation.init(function(){
			DictionaryDB.findOne({name:"Lingo"}, function(err,data){
				if (data){
					// found a dictionary, let's use it
					dictionaryDB = data;
					console.log("Dictionary initialized.");
					callback();
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
									dictionaryDB.save();
									callback();
								});	
						})	
					})

				}
			});
			
		})	
	},
	getRandomWord:function(langCode, callback){
		// returns a random word from the dictionary in the language specified by langCode
		// Callback returns {word:word, wordID:wordID};
		if (!dictionaryDB.initialized) new Error("Must initialize Dictionary before initializing.");
		Word.findById(_.sample(dictionaryDB.words), function(err,dbWord){		
			var returnWord = {word:"", wordID:dbWord._id};
			for (var i = 0; i<dbWord.translations.length; i++){
				if (dbWord.translations[i].langCode === langCode){
					returnWord.word = dbWord.translations[i].word;
					callback(err, returnWord);
				}
			}
			if (!returnWord.word){
					translation.getTranslation(dbWord.translations[0].word, 'eng', langCode, function(err, transWord){
						returnWord.word = transWord;
						dbWord.translations.push({langCode: langCode, word:transWord});
						dbWord.save(function(){
							callback(err, returnWord)
						})
						;
				})
			}
		});
	},
	checkTranslation: function(wordID, word, langCode, callback){
		if (!dictionaryDB.initialized) new Error("Must initialize Dictionary before initializing.");
		// Looks up word with wordID and checks that "word" matches
		// in the language given by "langCode"
		return true;
	}
	
};
