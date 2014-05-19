var quiz = {
	langToCode:"",
	langFromCode:"",
	userId: 0
};

var html = $('#quiz-template').html();
var quizTemplate = Handlebars.compile(html);

//added these to render handlebars within signin.jade
var signinhtml = $('#signin-template').html();
var signinTemplate = Handlebars.compile(signinhtml);

var newQuestion = function(){

	var queryData = {langCode:quiz.langFromCode};
	
	$.get('/dictionary/randomWord', queryData, function(resData, err){
		$('.container').empty();
		
		//-must submit: userID, langCodeAsked, wordIdAsked, langCodeAnswered, wordAnswered
		// var templateOutput = tweetTemplate(tweets[i]);
		var templateData = {
			langAsked:quiz.langFromCode,
			langAnswered:quiz.langToCode,
			wordAsked:resData.word
		};

		var quizTemplateOutput = quizTemplate(templateData);

		$('.container').append(quizTemplateOutput);
		$('.next-question').css("display", "none");
	});

};

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
			quiz.langFromCode = $('#transfrom .highlight').data("lang-code");
			quiz.langToCode = $('#transto .highlight').data("lang-code");
			
			newQuestion();

		}
	});

	$(document).on('submit', '#quiz-form', function(e){
		console.log($(this));
		e.preventDefault();
		$('.next-question').css("display", "block");
		$('.submit-answer').css("display", "none");
		$('.answer-field').css("display", "none");
		$('.answer-response').css("display","block");
		$('.answer-response').text("PLACEHOLDER FOR SERVER RESPONSE");
		// wrap into a function
		// grab the answer
		// submit the answer to the server
		// retrieve the answer from the server
		// take out the submit button (hide)
		// display correct/incorrect answer
		// display new button for the next question
			//add to template and hide/unhide
	});
});