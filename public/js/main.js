// on submit send the QTY#3 form fields to app.js

$(document).on('ready', function(){
	// create our template blueprint...
	// var html = $('#tweet-template').html();
	var html = $('#quiz-template').html();
	// var tweetTemplate = Handlebars.compile(html);
	var quizTemplate = Handlebars.compile(html);
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
				$('.container').empty();
				
				//-must submit: userID, langCodeAsked, wordIdAsked, langCodeAnswered, wordAnswered
				// var templateOutput = tweetTemplate(tweets[i]);
				var templateData = {
					langAsked:langFromCode,
					langAnswered:langToCode,
					wordAsked:resData.word
				};
				var quizTemplateOutput = quizTemplate(templateData);

				$('.container').append(quizTemplateOutput);

				// console.log(resData);

				// var questionText = "Your " + langFromCode + " word is : " + resData.word + " .";
				// console.log(questionText);

				// var questionAnswer = "What is the translation for this word in " + langToCode + " ?";	
				// console.log(questionAnswer);

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
