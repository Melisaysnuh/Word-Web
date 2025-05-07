import express from 'express';

import { submitWordController } from "../controllers/submit-controller";

export default function submitRoute (submitWordController: any) {
    const router = express.Router();

    router.post('/submit', submitWordController);
    return router;
};

