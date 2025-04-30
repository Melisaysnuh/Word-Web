// tests/controllers/registerController.test.ts
import { describe, it, expect, beforeEach, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import bodyParser from 'body-parser';
import { registerController } from '../../src/controllers/auth-controller';
import UserModel from '../../src/Models/UserModel';

let mongoServer: MongoMemoryServer;
const app = express();
app.use(bodyParser.json());
app.post('/register', registerController);

beforeEach(async () => {
    await UserModel.deleteMany({});
});

beforeAll(async () => {
    process.env.JWT_SECRET = 'testsecret'; // ensure consistent secret
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri(), { dbName: 'test' });
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('registerController', () => {
    it('should register a user and return token', async () => {
        const res = await request(app).post('/register').send({
            email: 'test@example.com',
            password: 'Password123',
            firstName: 'Tester'
        });

        expect(res.status).toBe(201);
        expect(res.body.token).toBeDefined();
        expect(res.body.user.email).toBe('test@example.com');

    });

    it('should reject duplicate email registration', async () => {
        await UserModel.create({ email: 'dupe@example.com', password: 'testpass123' });

        const res = await request(app).post('/register').send({
            email: 'dupe@example.com',
            password: 'anotherpass',
        });

        expect(res.status).toBe(400);
        expect(res.text).toContain('User already exists');
    });

    it('should reject missing email/password', async () => {
        const res = await request(app).post('/register').send({ email: '' });

        expect(res.status).toBe(400);
        expect(res.text).toContain('Email and password are required');
    });

    it('should reject weak password', async () => {
        const res = await request(app).post('/register').send({
            email: 'weak@pass.com',
            password: '123',
        });

        expect(res.status).toBe(400);
        expect(res.text).toContain('Password doesn\'t meet strength requirements');
    });
});
