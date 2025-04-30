import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest';
import express from 'express';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import {UserModel} from '../../src/Models/UserModel'
import { authMiddleware } from '../../src/middleware/authMiddleware';

const JWT_SECRET = process.env.JWT_SECRET;

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri(), { dbName: 'testAuthDB' });
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

const createApp = () => {
    const app = express();
    app.use(authMiddleware);
    app.get('/protected', (req, res) => {
        res.status(200).json({ message: 'Access granted', user: req.user });
    });
    return app;
};

describe('authMiddleware', () => {
    it('should allow access with a valid token', async () => {
        const user = await UserModel.create({
            email: 'test@auth.com',
            password: 'test1234',
            history: [],
        });

        const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '1h' });

        const res = await request(createApp())
            .get('/protected')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Access granted');
        expect(res.body.user.email).toBe(user.email);
    });

    it('should fail if Authorization header is missing', async () => {
        const res = await request(createApp()).get('/protected');
        expect(res.status).toBe(401);
    });

    it('should fail on invalid token', async () => {
        const res = await request(createApp())
            .get('/protected')
            .set('Authorization', 'Bearer invalidtoken');

        expect(res.status).toBe(401);
        expect(res.body.message).toBe('Invalid token');
    });

    it('should fail if token is expired', async () => {
        const user = await UserModel.create({
            email: 'expired@auth.com',
            password: 'test1234',
            history: [],
        });

        const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '1ms' });

        // Give it a moment to expire
        await new Promise((r) => setTimeout(r, 10));

        const res = await request(createApp())
            .get('/protected')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(401);
        expect(res.body.message).toBe('Token has expired');
    });

    it('should return 404 if user is not found', async () => {
        const fakeId = new mongoose.Types.ObjectId();
        const token = jwt.sign({ _id: fakeId }, JWT_SECRET, { expiresIn: '1h' });

        const res = await request(createApp())
            .get('/protected')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(404);
        expect(res.body.message).toBe('User not found');
    });
});
