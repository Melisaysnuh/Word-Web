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
dotenv.config()

const port = process.env.DEV_PORT;
if (!port) {console.error('Port not found from .env')}

export const app = createApp({
    loadLettersController,
    loginController,
    registerController,
    submitAuthController,
    submitWordController,
    authMiddleware
});

(async () => {
    await connectDB();
    console.log('DB Connected from server.');
    app.listen(port, () => {
        console.log(`The server is running at http://localhost:${port}`);
    });
})();
