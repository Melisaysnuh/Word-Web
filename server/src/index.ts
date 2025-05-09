import { createApp } from './createApp.js';
import { connectDB } from './Models/index.js';
import {
    loadLettersController
} from './controllers/fetch-controller.js';
import {
    submitAuthController, submitWordController
} from './controllers/submit-controller.js';
import {
    loginController, registerController
} from './controllers/auth-controller.js';
import { authMiddleware } from './middleware/authMiddleware.js';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

async function logOutboundIP () {
    try {
        const res = await fetch('https://api.ipify.org?format=json');
        const data = await res.json();
        console.log('Outbound IP as seen externally:', data.ip);
    } catch (err) {
        console.error('Failed to get external IP:', err);
    }
}

logOutboundIP();

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

const url = process.env.BACKEND_URL || process.env.BACKEND_URL;
if (!url) {console.error('Port not found from .env')}

export const app = createApp({
    loadLettersController,
    loginController,
    registerController,
    submitAuthController,
    submitWordController,
    authMiddleware
});
const port = 3000;
(async () => {
    await connectDB();
    app.listen(port, () => {
        console.log(`The server is running at ${url}`);
    });
})();
