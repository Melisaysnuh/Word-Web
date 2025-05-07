import express from 'express';
export const app = express();
import { loadLettersController } from './controllers/fetch-controller.js';
import { submitAuthController, submitWordController } from './controllers/submit-controller.js';
import cors from 'cors';
import { connectDB } from './Models/index.js';
import { loginController, registerController } from './controllers/auth-controller.js';
import { authMiddleware } from './middleware/authMiddleware.js';


const port = process.env.PORT;

app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    }));
app.options('*', cors());
app.use((req, res, next) => {
    console.log(`[SERVER] Incoming: ${req.body} `);
    next();
});
app.use(express.json());


    (async () => {
        await connectDB();
        console.log('DB Connected from server.');
    })()


app.get("/", loadLettersController);
app.post('/submitauth', authMiddleware, submitAuthController);
app.post('/submit', submitWordController);
app.post('/auth/login', loginController);
app.post('/auth/register', registerController);



app.listen(port, () => {
    console.log(`The server is running at http://localhost:${port}`);
});