LINGO

Objective

	Create a web app that helps people learn a new language, utilizing a dynamic quiz system that allows the user to practice and test their understanding.

Resources
	1) BeGlobal API: http://languagecloud.sdl.com/translation-api
	2) node-beglobal npm module: https://github.com/robert52/node-beglobal

Requirements

	Part I
		Your app should consist of three main sections: Translate, Quiz, and Progress.

		Translate

			1) When the user goes to the Translate page, they are presented with a form with the following fields:

				A) Language of word to translate
				B) Language to translate it into
				C) Word to translate

			2) When they hit enter or the submit button, their word should be submitted to the server for translation.

			3) The server should translate the submitted word using the node-beglobal npm module. You will have to sign up for the BeGlobal API to receive a sandbox API key which will allow them to authenticate your requests.

			4) The user is shown the translation, or a friendly message if a translation couldn't be found.

		Quiz

			1) When the user goes to the Quiz page, they should first be asked what language they would like to study.

			2) The quiz should consist of 10 translations.

			3) If the user gets 3 questions incorrect, they fail the quiz and must start over.

			4) This user should be shown a word and given a form to type in the translation. You will need to store a list of words that are used for the quiz (you can use a random word generator like this or this).

			5) When they hit enter or the submit button, their answer should be submitted to the server for verification.

			6) The server should check if the submitted answer is correct using the node-beglobal npm module. 

			7) If the user gets the answer incorrect, they should be shown the correct answer.

			8) If the user gets the answer correct, they should be shown a success message.

			9) After the user sees whether they were correct or incorrect, they should be prompted with the next word to translate.

			10) If the user's answer is off by just a single character, it should count as correct and they get a warning message that points out their typo.

			11) If the user misses an accent, it should count as correct and they should get a warning message that reminds them to be careful about accents.

			12) After completing 3 quizzes (successfully or unsuccessfully) allow the user to take the following different types of quizzes:

				A) Random - Default quiz type.
				B) Hardest - The 10 words they have gotten wrong the most.
				C) Least Practiced - The 10 words they have practiced the least.
				D) Most Recent - The most recent 10 words they were tested on.
		
		Progress

			1) 
				A)
				B)
				C)
				D)
				E)
				F)
				G)
				H)
				I)
				J)

			2) 

	Bonus

		1) 
		2) 
		3)
		4)
		5)
