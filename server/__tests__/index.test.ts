import request from 'supertest';
import { vi, describe, it, beforeEach,  expect } from 'vitest';
import { app } from '../src/index'; // Ensure correct path


import * as fetchController from '../src/controllers/fetch-controller.js';
import * as submitController from '../src/controllers/submit-controller.js';
import * as authController from '../src/controllers/auth-controller.js';
import * as authMiddleware from '../src/middleware/authMiddleware.js';

describe('Express API Endpoints', () => {
     beforeEach(() => {
        vi.restoreAllMocks(); // Reset spies before each test
    });

    it('should return 200 and load letters on GET /', async () => {
        const spy = vi.spyOn(fetchController, 'loadLettersController');

        const response = await request(app).get('/');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Letters loaded' });

        // Ensure the controller was called once
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should return 200 when submitting auth on POST /submitauth', async () => {
        const spy = vi.spyOn(submitController, 'submitAuthController');

        const response = await request(app).post('/submitauth');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Auth Submitted' });

        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should return 201 when submitting a word on POST /submit', async () => {
        const spy = vi.spyOn(submitController, 'submitWordController');

        const response = await request(app).post('/submit');

        expect(response.status).toBe(201);
        expect(response.body).toEqual({ message: 'Word Submitted' });

        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should return 200 when logging in on POST /auth/login', async () => {
        const spy = vi.spyOn(authController, 'loginController');

        const response = await request(app).post('/auth/login').send({
            username: 'testuser',
            password: 'password123',
        });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token', 'mock-token');

        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should return 201 when registering on POST /auth/register', async () => {
        const spy = vi.spyOn(authController, 'registerController');

        const response = await request(app).post('/auth/register').send({
            username: 'newuser',
            password: 'password123',
        });

        expect(response.status).toBe(201);
        expect(response.body).toEqual({ message: 'User Registered' });

        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should prevent duplicate API calls in rapid succession', async () => {
        const spy = vi.spyOn(submitController, 'submitWordController');

        const requests = [
            request(app).post('/submit'),
            request(app).post('/submit'),
            request(app).post('/submit'),
        ];

        await Promise.all(requests);

        // Ensure the controller is called exactly 3 times (one per request)
        expect(spy).toHaveBeenCalledTimes(3);
    });

    it('should ensure async response completion before moving forward', async () => {
        const slowSpy = vi.spyOn(fetchController, 'loadLettersController').mockImplementation(async (req, res) => {
            await new Promise((resolve) => setTimeout(resolve, 100)); // Simulate delay
            res.status(200).json({ message: 'Delayed Response' });
        });

        const response = await request(app).get('/');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Delayed Response' });

        expect(slowSpy).toHaveBeenCalledTimes(1);
    });
});
