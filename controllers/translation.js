var BeGlobal = require('node-beglobal');

var translationModel = require('../models/translation.js');

var beglobal = new BeGlobal.BeglobalAPI({
	api_token: 'iWO%2FU0dzxF8YIjkGCaghVw%3D%3D'
});

module.exports = {
	init: function(callback){
		translationModel.init(callback);
	},

	getTranslation: function(req, res){
		// submit a word for translation
		// must submit wordFrom:String, langFromCode:String, langToCode:String
		// returns wordTo:String
		var translationData = {};
		translationData['wordFrom'] = req.query.wordFrom;
		translationData['langFromCode'] = req.query.langFromCode;
		translationData['langCodeTo'] = req.query.langToCode;
		console.log("Translation recieved: ", translationData);
		translationModel.getTranslation(translationData, function(err, data){
			res.send(data);
		});

	},
	getFromLanguages: function(req, res){
		res.send("Get Languages not implemented yet");

	},
	getToLanguages: function(req, res){
		res.send("Get Languages not implemented yet");

	}
};