import express from 'express';
const app = express();
import { loadLetters } from './controllers/load-letters.js';
import { submitWordController } from './controllers/submit-word.js';
import cors from 'cors';



const port = process.env.PORT || 3000;
app.use(
    cors());
app.use(express.json())


app.get("/", loadLetters);
//todo
app.post('/submit', submitWordController);

// Start the Express server
app.listen(port, () => {
    console.log(`The server is running at http://localhost:${port}`);
});