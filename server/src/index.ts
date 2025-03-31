import express from 'express';
const app = express();
import { loadLettersController } from './controllers/fetch-controller.js';
import { submitAuthController, submitWordController } from './controllers/submit-controller.js';
import cors from 'cors';
import { connectDB } from './Models/index.js';
import { loginController, registerController } from './controllers/auth-controller.js';
import { authMiddleware } from './middleware/authMiddleware.js';


const port = process.env.PORT || 3000;
app.use(
    cors({
        origin: 'http://localhost:5173',  // Allow only the specific frontend origin
        credentials: true  // Allow cookies to be sent with requests
    }));
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


// Start the Express server
app.listen(port, () => {
    console.log(`The server is running at http://localhost:${port}`);
});