// need to use async
// need to add words to dictinoary


var BeGlobal = require('node-beglobal');
var mongoose = require('mongoose');
var fs = require('fs');
var async = require('async');


var beglobal = new BeGlobal.BeglobalAPI({
	api_token: 'iWO%2FU0dzxF8YIjkGCaghVw%3D%3D'
});

mongoose.connect('mongodb://localhost/lingo');

var Word = mongoose.model('Word',
    { wordNum: Number,
    eng: String,
    ger: String,
    fra: String,
    spa: String}
);

var DictionaryDB = mongoose.model('Dictionary',
	{complete: Boolean,
	words:[Word]
	}
);

var dictionaryDB = new DictionaryDB({complete:false}),

var languages = [
			{
				key:"eng",
				name:"English"
			},{
				key:"ger",
				name:"German"
			},{
				key:"fra",
				name:"French"
			},{
				key:"spa",
				name:"Spanish"
			}
		]

var getTranslation = function (word, langTo, callback){
	beglobal.translations.translate(
		{text: word,
			to: langTo,
			from: "eng"},
			function(err, results){	
				if (err) throw err;		 				
				callback(langTo, results.translation);
		}
	)
};

 var getTranslations = function(engWord, wordNum, callback){
 	var wordObj = new Word({wordNum:wordNum, eng:engWord});
 	var asyncTasks = [];
 	for (var i=0; i<languages.length; i++){
 		asyncTasks.push(function(asyncCallback){
			getTranslation(engWord, languages[i], function(langTo, wordTo){
 				wordObj[langTo] = wordTo;
 				asyncCallback();
 			});
		});
 	};	

 	async.parallel(asyncTasks, function(){
  		callback(wordObj);
	});

};

var Dictionary = module.exports = {
		
	init: function(){
		if (!DictionaryDB.find({complete:true})){
			Word.remove({}, function(err){
				if (err) throw err;
				fs.readFile('./json/1000-words.json', 'utf-8', function(err, readData){
					if (err) throw err;
					var data = JSON.parse(readData);
					var asyncTasks = [];
					for (var i=0; i<5; i++){
					//for (var i=0; i<data.words.length; i++){
						asyncTasks.push(function(asyncCallback){
							getTranslations(data.words[i], wordNum, function(word){
								word.save();
								asyncCallback();
							});	
						}		
					}
					async.parallel(asyncTasks, function(){							
						dictionaryDB.complete = true; 
						dictionary.save();
					});		
				});
			});
		}	
	},
	getLanguages:function(){
		if (!created) return new Error("Need to create Dictionary before using");
		return languages;
	}
	getRandomWord:function(langFrom, langTo){
		if (!created) return new Error("Need to create Dictionary before using");
		var wordFrom = "Hundred";
		var wordID = 6;
		var question = {wordFrom:wordFrom, wordID:wordID};
		return question;
	}
	
};
