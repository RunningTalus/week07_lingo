
var BeGlobal = require('node-beglobal');
var _ = require('underscore');

var beglobal = new BeGlobal.BeglobalAPI({
	api_token: 'iWO%2FU0dzxF8YIjkGCaghVw%3D%3D'
});

var languagePairs = [];
var languageFromNames = [];


var Translation = module.exports = {
	getTranslation : function (wordFrom, langFromCode, langToCode, callback){
		console.log("Translating: ", wordFrom, " to ", langToCode);
		beglobal.translations.translate(
			{text: wordFrom,
				to: langToCode,
				from: langFromCode},
				function(err, results){		
					console.log("Got: ", results.translation);
					callback(err, results.translation);
			}
		)
	},
	
	init: function(callback){
		
		beglobal.languages.all(
  			function(err, results) {
  				for (var i=0; i<results.length; i++){
	  				languagePairs.push({
	  					fromCode: results[i].from.code,
						fromName: results[i].from.name,
						toCode: results[i].to.code,
						toName: results[i].to.name
					})
					languageFromNames.push(results[i].from.name);
	  			}
	  			// TODO: find any languages that we can't translate to from english
	  			// and take any pairs that use those languages out of the list
	  			languageFromNames = _.uniq(languageFromNames);
    			callback(err);
			}
		)
	}

}

