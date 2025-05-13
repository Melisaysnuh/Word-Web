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




if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

const url = process.env.BACKEND_URL || process.env.BACKEND_URL;
if (!url) {console.error('uRL not found from .env')}

export const app = createApp({
    loadLettersController,
    loginController,
    registerController,
    submitAuthController,
    submitWordController,
    authMiddleware
});
const port = process.env.PORT || 3000;
(async () => {
    await connectDB();
    app.listen(port, () => {
        console.log(`The server is running at port ${port}`);
    });
})();
