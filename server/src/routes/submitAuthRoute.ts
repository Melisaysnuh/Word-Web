
import express, { RequestHandler } from 'express';
import { ParsedQs } from 'qs';
import { authMiddleware } from '../middleware/authMiddleware';
export function submitAuthRoute (submitAuthController: RequestHandler<{}, any, any, ParsedQs, Record<string, any>>, authMiddleware: any) {
    const router = express.Router();

    router.post('/submitauth', authMiddleware, submitAuthController);
    return router;
};

