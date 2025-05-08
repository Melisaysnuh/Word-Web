// src/createApp.js
import express from 'express';
import cors from 'cors';
import getRoute from './routes/index.js';
import loginRoute from './routes/loginRoute.js';
import registerRoute from './routes/registerRoute.js';
import { submitAuthRoute } from './routes/submitAuthRoute.js';
import submitRoute from './routes/submitRoute.js';
import { loadLettersController } from './controllers/fetch-controller.js';

export function createApp (args: any) {
    const {
        loginController,
        registerController,
        submitAuthController,
        submitWordController,
        authMiddleware
    } = args
    const app = express();

    app.use(cors({
        origin: 'http://localhost:5173',
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    }));
    app.options('*', cors());
    app.use(express.json());

    app.use('/', getRoute(loadLettersController));
    app.use('/auth/login', loginRoute(loginController));
    app.use('/auth/register', registerRoute(registerController));
    app.use('/submit', submitRoute(submitWordController));
    app.use('/submitauth', submitAuthRoute(submitAuthController, authMiddleware));

    return app;
}
