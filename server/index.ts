import express from 'express';
const app = express();
import { loadLettersController } from './controllers/load-letters.js';
import { submitWordController } from './controllers/submit-word.js';
import cors from 'cors';
import { connectDB } from './Models/index.js';

import crypto from 'crypto';
//import { authMiddleware } from './middleware/authMiddleware.js';
import { loginController, registerController } from './controllers/authControllers.js';
const jwtSecret = crypto.randomBytes(64).toString('hex');
console.log(jwtSecret);


const port = process.env.PORT || 3000;
app.use(
    cors({
        origin: 'http://localhost:5173',  // Allow only the specific frontend origin
        credentials: true  // Allow cookies to be sent with requests
    }));
app.use(express.json());


    (async () => {
        await connectDB();
        console.log('Application is ready');
    })()


app.get("/", loadLettersController);
app.post('/submit', submitWordController);
app.post('/auth/login', loginController);
app.post('/auth/register', registerController);

// Start the Express server
app.listen(port, () => {
    console.log(`The server is running at http://localhost:${port}`);
});