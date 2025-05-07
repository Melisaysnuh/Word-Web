import express from 'express';
import { RequestHandler } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

export default function getRoute (loadLettersController: RequestHandler<{}, any, any, ParsedQs, Record<string, any>>) {
    const router = express.Router();

    router.get('/', loadLettersController);
    return router;

};


