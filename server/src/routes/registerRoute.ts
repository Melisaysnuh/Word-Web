import express from 'express';
import { RequestHandler } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

export default function registerRoute (registerController: RequestHandler<{}, any, any, ParsedQs, Record<string, any>>) {
    const router = express.Router();

    router.post('/auth/register', registerController);
    return router;
};

