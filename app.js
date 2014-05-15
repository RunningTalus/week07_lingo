var express = require('express');
var bodyParser = require('body-parser');

var request = require('request');
var translateController = require('./controllers/translate.js');


var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser());

app.get('/', function(req, res) {
	res.render('index');
});

app.get('/translate', function(req, res) {
	res.render('translate');
});

app.get('/translate/session', translateController.translate);

var server = app.listen(3444, function() {
	console.log('Express server listening on port ' + server.address().port);
});
