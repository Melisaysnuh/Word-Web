import express from 'express';
const app = express();
import { loadLetters } from './controllers/load-letters.js';
import { submitWord } from './controllers/submit-word.js';
//todo:
/* import { submitWord } from './controllers/submit-word.js'; */
// todo add cors
const port = process.env.PORT || 3000;
app.get("/", loadLetters);
//todo
app.post('/submit', submitWord);
// Start the Express server
app.listen(port, () => {
    console.log(`The server is running at http://localhost:${port}`);
});
