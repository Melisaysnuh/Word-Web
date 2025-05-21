
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

---

## Installation Instructions

Follow these steps to set up the project locally:

### 1. Clone the Repository

First, clone the project from GitHub to your local machine using Git.

Navigate into the project directory and install dependencies using npm install

Set up envrionment variables: This project requires Merriam-Webster API, which uses an api key.

Then, store your API key and the dictionary base URL in a .env file in your server.

*Start the backend*
Navigate into /server and run npm i

Run npm run start

*Start the frontend*
Navigate into /client

Run npm i

Run npm run start

You will now load the game.
