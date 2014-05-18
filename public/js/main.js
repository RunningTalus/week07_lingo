// on submit send the QTY#3 form fields to app.js

$(document).on('ready', function(){
	$('#translate').on('submit', function(e){
		e.preventDefault();
		console.log($(this));

		$.get('/translation/translate', $(this).serialize(), function(data) {
			console.log(data);
			var resultField = $('<div></div>');
			$(resultField).append(data);
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
			var langFromCode = $('#transfrom .highlight').data("lang-code");
			var langToCode = $('#transto .highlight').data("lang-code");
			var queryData = {langCode:langFromCode};
			
			$.get('/dictionary/randomWord', queryData, function(resData, err){
				$('#container').empty();
				$('#container').addClass('quiz-template');
				
				console.log(resData);

				var questionText = "Your " + langFromCode + " word is : " + resData.word + " .";
				console.log(questionText);

				var questionAnswer = "What is the translation for this word in " + langToCode + " ?";	
				console.log(questionAnswer);

				//need to continue working on jQuery functionality for form and quiz
			});

		}



	});
});	