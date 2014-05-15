var BeGlobal = require('node-beglobal');
var beglobal = new BeGlobal.BeglobalAPI({
	api_token: 'iWO%2FU0dzxF8YIjkGCaghVw%3D%3D'
});

module.exports = {
	translate: function(req, res) {
		console.log(req.query);
		console.log("req.query is working");
		// { transfrom: 'eng', transto: 'ger', transword: 'hello' }
		// 
		// 
		beglobal.translations.translate(
			{text: req.query.transword, 
		 	to: req.query.transto, 
		 	from: req.query.transfrom},
		 	function(err, results){
		 		

		 		res.send({err: err, results:results});
		 	});
		
		
	}
};