// on submit send the QTY#3 form fields to app.js

$(document).on('ready', function(){
	$('#translate').on('submit', function(e){
		e.preventDefault();
		console.log($(this));

		$.get('/translate/session', $(this).serialize(), function(data) {
			console.log(data);
			var resultField = $('<div></div>');
			$(resultField).append(data.results.translation);
			$('#result').empty();
			$('#result').append(resultField);
		});	
	});
});	

// 	// Listen for new user submit
// 	$('#newuser').on('submit', function(e){
// 		// stop form from submitting
// 		e.preventDefault();

// 		// Post the form data via ajax to the server
// 		$.post('/user/add', $(this).serialize(), function(data){
// 			console.log('User:', data);
// 		});
// 	});

// });