import express from 'express';
const app = express();
import { loadLettersController } from './controllers/load-letters.js';
import { submitWordController } from './controllers/submit-word.js';
import cors from 'cors';
import session from 'express-session';
import { randomUUID } from 'crypto';

import crypto from 'crypto';
const jwtSecret = crypto.randomBytes(64).toString('hex');
console.log(jwtSecret);
app.use(
    session({
        genid: function () {
            return randomUUID(); // use UUIDs for session IDs
        },
        secret: 'melissa',
        name: 'sid',
        resave: true,
        saveUninitialized: false,
        cookie: {
            httpOnly: true, // Helps to prevent client-side script access to the cookie
            secure: false,
            maxAge: 1000 * 60 * 30,
            sameSite: false, // 30-minute expiration (or as needed)
        },
    })
);

const port = process.env.PORT || 3000;
app.use(
    cors({
        origin: 'http://localhost:5173',  // Allow only the specific frontend origin
        credentials: true  // Allow cookies to be sent with requests
    }));
app.use(express.json())


app.get("/", loadLettersController);
//todo
app.post('/submit', submitWordController);

// Start the Express server
app.listen(port, () => {
    console.log(`The server is running at http://localhost:${port}`);
});