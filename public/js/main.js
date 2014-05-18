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
				// $('#container').addClass('quiz-template');
				$(document).addClass('quiz-template');
				$('#container').after(<div>"quiz-template"</div>);
				
				console.log(question);

				var questionText = "Your " + langFrom + " word is : " + question.wordFrom + " .";
				console.log(questionText);

				var questionAnswer = "What is the translation for this word in " + langTo + " ?";	
				console.log(questionAnswer);

				$('.quiz-template').after('form-group');
				$('.form-group').addClass('qa-slot');
				$('#qa-slot').addClass('q-holder', 'a-holder');


				//need to continue working on jQuery functionality for form and quiz
			});

		}



	});
});	

// <div class="form-group has-success">
//   <label class="control-label" for="inputSuccess1">Input with success</label>
//   <input type="text" class="form-control" id="inputSuccess1">
// </div>
// <div class="form-group has-warning">
//   <label class="control-label" for="inputWarning1">Input with warning</label>
//   <input type="text" class="form-control" id="inputWarning1">
// </div>
// <div class="form-group has-error">
//   <label class="control-label" for="inputError1">Input with error</label>
//   <input type="text" class="form-control" id="inputError1">
// </div>