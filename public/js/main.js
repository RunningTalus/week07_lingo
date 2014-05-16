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

	$('.transfrom, .transto').on('click', function(){
		$(this).siblings().removeClass('highlight');
		$(this).addClass('highlight');
	});

	$('.start').on('click', function(){
		if (!$('#transfrom .highlight').length ||
			!$('#transto .highlight').length){
			alert("Please pick two languages");
		}
		else{
			var langFrom = $('#transfrom .highlight').data("lang");
			var langTo = $('#transto .highlight').data("lang");
			var languages = {langTo:langTo, langFrom:langFrom};
			
			$.post('/quiz/question', languages, function(question, err){
				$('#container').empty();
				$('#container').addClass('quiz-template');
				
				console.log(question);

				var questionText = "Your " + langFrom + " word is : " + question.wordFrom + " .";
				console.log(questionText);

				var questionAnswer = "What is the translation for this word in " + langTo + " ?";	
				console.log(questionAnswer);
			});

		}



	});
});	