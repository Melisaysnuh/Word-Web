

# Word Web

 Word Web is a daily word game to find anagrams for a group of seven letters.

*How to play:*
Find English words with at least 4 letters that are anagrams. Each day will have at least 1 pangram, or word with all seven letters. All words in the list must have the center letter.

*Scoring*
Four-letter words are worth one point each, five-or-more-letter words are worth one point per letter. Any pangram is worth its letters + seven bonus points.




## *to delete and to do*

### To Do (as of Nov 8):

 - Add point calculation
 - Create / save session
 - Word Check Service, Routing & Controllers, Module
	 - Needs to receive post request with word in body
		 - needs to check word against letters
		 - needs to return response:
			 - word
			 - points
		 - needs to save the word
		 - OR needs to return error: "not in word list"
 - Front-end
	 - Modularize front end
	 - Get letters and populate buttons
	 - Implement shuffle function
 - Configure input
	 - Via keyboard, react / block any letter when it's not in the web
	 - Configure buttons as input
	 - handlesubmit
		 - request to server to check word
		 - If it's in the list
			 - share success message
			 - update progress bar
			 - add word to guessed word list
			 - clear form
		 - If not, show error / clear form
		 -
 ~~- FIX: Not getting all pangrams~~




TODO: INSTALLATION INSTRUCTIONS

### MVP



Users should see a new group of 7 letters each day, and should be able to enter words. For a given word, it will be accepted or rejected. The game will list all correctly guessed words in alphabetical order, and will have a progress bar that progresses as the user guesses words.



### Optional Features:

1. "Helper" to show a grid containing how many words remain grouped by length and starting letter, that is updated dynamically
2. "Hover" over a word to get a definition
3. German-language option
4. History*
5. Native
6.  - black widow screen
7. Select word list source



### Tech stack


*Front End*
 - React

*Back End*
 - Express
 - MongoDB
 - cron




#### Data sources

 - English Dictionary API from Merriam Webster:
   https://dictionaryapi.com/

TBD: German language Dictionary API:
   https://www.dwds.de/d/api#wb-list
   https://www.npmjs.com/package/word-list
#### Tools
- Design: Canva, Figma
- Stack Edit
- Chat GPT
