import express, { RequestHandler } from 'express';

import { submitWordController } from "../controllers/submit-controller";

export default function submitRoute (submitWordController: RequestHandler<any>) {
    const router = express.Router();

    router.post('/', submitWordController);
    return router;
};

