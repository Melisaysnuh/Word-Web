// src/createApp.js
import express from 'express';
import cors from 'cors';
import getRoute from './routes/index.js';
import loginRoute from './routes/loginRoute.js';
import registerRoute from './routes/registerRoute.js';
import { submitAuthRoute } from './routes/submitAuthRoute.js';
import submitRoute from './routes/submitRoute.js';
import { loadLettersController } from './controllers/fetch-controller.js';
import dotenv from 'dotenv';
if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

export function createApp (args: any) {
    const {
        loginController,
        registerController,
        submitAuthController,
        submitWordController,
        authMiddleware
    } = args
    const app = express();

    const clienturl= process.env.CLIENT_URL
    const clienturl2 = process.env.CLIENT_URL_2
    if (!clienturl) {
        console.error('error loading client url from .env')
    }

    const allowedOrigins = [
        'https://word-web-fe-production.up.railway.app/',
        'http://wordwebs.de',
        'https://wordwebs.de', // if your domain works over https too
    ];


    app.use(cors({
        origin: function (origin, callback) {
            console.log('origin is: ', origin)
            if (!origin) {
                // Allow non-browser requests (e.g., Postman, server-to-server)
                callback(null, true);
            } else if (allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                console.warn(`Blocked CORS origin: ${origin}`);
                callback(new Error('Not allowed by CORS'));
            }
        },
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
