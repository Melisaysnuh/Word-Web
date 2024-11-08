Word Web

## Repository

A daily word game to find anagrams for a group of letters.

## Project description


Similar to the NYT Spelling Bee App, this game requires you to find English words with at least 4 letters that are anagrams. Each day will have at least 1 pangram. All words in the list must have the center letter. The app also contains a word list to show all guessed words, and a score to show you how you're progressing and how many words are left. Four letter words get one point each, while words with five or more letters get a point for each letter. Any pangram that has all seven letters will get an additional seven points.

## MVP

Users should see a new group of 7 letters each day, and should be able to enter words. For a given word, it will be accepted or rejected. The game will list all correctly guessed words in alphabetical order, and will have a progress bar that progresses as the user guesses words.

*Optional Features:*
1. "Helper" to show a grid containing how many words remain grouped by length and starting letter, that is updated dynamically
2.  "Hover" over a word to get a definition
3.  German-language option
4.  History*

## Tech stack

Front End: React

Back End:
Express
MongoDB
cron


## Data sources



English Dictionary API from Merriam Webster: https://dictionaryapi.com/
TBD: German language Dictionary API: https://www.dwds.de/d/api#wb-list
