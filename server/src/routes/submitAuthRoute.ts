
import express, { RequestHandler } from 'express';
import { ParsedQs } from 'qs';

export function submitAuthRoute (submitAuthController: RequestHandler<{}, any, any, ParsedQs, Record<string, any>>, authMiddleware: RequestHandler<any>) {
    const router = express.Router();

    router.post('/submitauth', authMiddleware, submitAuthController);
    return router;
};

