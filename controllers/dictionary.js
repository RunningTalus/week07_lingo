var dictionaryModel = require('../models/dictionary.js');

var Dictionary = module.exports = {
	init: function(callback){
		dictionaryModel.init(callback);
	},

	getRandomWord:function(req, res){
		var langCode = req.query.langCode;
		dictionaryModel.getRandomWord(langCode, function(err, data){
			res.send(data);
		});
	}
		
};