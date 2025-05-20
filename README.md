

# Word Web
![ScreenShot](/client/public/Screenshot.png)


**Description**:
 Word Web is a free daily word game where the goal is to find anagrams for a group of seven letters.

 *How to play:*
Find English words with at least 4 letters that are anagrams. Each day will have at least 1 isogram, or word with all seven letters. All words in the list must have the center letter.

*Scoring*
Four-letter words are worth one point each, five-or-more-letter words are worth one point per letter. Any isogram is worth its letters + seven bonus points.



## Prerequisites

Before setting up the project, ensure you have the following installed:

- **Node.js** (v14.x or later) and **npm** (Node Package Manager)
  [Download Node.js](https://nodejs.org/)

- **Git** (for cloning the repository)
  [Install Git](https://git-scm.com/)

# Project Name

**Description**:
Word web is a game for word lovers and puzzle-heads. See how many different words you can make using a 7-letter isogram. Get extra points if you guess the isogram, and become a BLACK WIDOW!

---

## Tech Stack

- **React** (with TypeScript)
- **Express** (Node.js)
- **npm** (Node Package Manager)
- **Other relevant technologies/libraries**: Merriam Webster API, Vitest

---

## Prerequisites

Before setting up the project, ensure you have the following installed:

- **Node.js** (v14.x or later) and **npm** (Node Package Manager)
  [Download Node.js](https://nodejs.org/)

- **Git** (for cloning the repository)
  [Install Git](https://git-scm.com/)

---

## Installation Instructions

Follow these steps to set up the project locally:

### 1. Clone the Repository

First, clone the project from GitHub to your local machine using Git.

Navigate into the project directory and install dependencies using npm install

Set up envrionment variables: This project requires Merriam-Webster API, which uses an api key. To request your API key, visit https://dictionaryapi.com/products/api-collegiate-dictionary

Then, store your API key and the dictionary base URL in a .env file in your server.

*Start the backend*
Navigate into /server and run npm i

Run npm run start



*Start the frontend*
Navigate into /client

Run npm i

Run npm run start

You will now load the game.



### MVP



Users should see a new group of 7 letters each day, and should be able to enter words. For a given word, it will be accepted or rejected. The game will list all correctly guessed words in alphabetical order, and will have a progress bar that progresses as the user guesses words.



### Upcoming Features:

1. Native
2. History*
3. "Helper" to show a grid containing how many words remain grouped by length and starting letter, that is updated dynamically
4. "Hover" over a word to get a definition
5. German-language option
7.
5.1.  - recluse /black widow screen
1. Select word list source







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
