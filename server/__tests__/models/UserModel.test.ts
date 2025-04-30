import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import {UserModel} from '../../src/Models/UserModel'

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri(), {
        dbName: "vitestTestDB",
    });
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

beforeEach(async () => {
    await UserModel.deleteMany({});
});

describe('User Model', () => {
    it('should create & save a user successfully', async () => {
        const user = new UserModel({
            email: 'test@example.com',
            password: 'mypassword',
            firstName: 'Souxsie',
            history: [
                {
                    daylist_id: '1989_01_01',
                    guessedWords: [{ word: 'onion' }],
                    totalUserPoints: 10,
                    level: 'Daddy Long-Legs',
                },
            ],
        });

        const savedUser = await user.save();

        expect(savedUser._id).toBeDefined();
        expect(savedUser.email).toBe('test@example.com');
        expect(savedUser.firstName).toBe('Souxsie');
        expect(savedUser.password).not.toBe('mypassword'); // should be hashed
    });

    it('should not save user without required fields', async () => {
        const user = new UserModel({});

        try {
            await user.save();
        } catch (error: any) {
            expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
            expect(error.errors.email).toBeDefined();
            expect(error.errors.password).toBeDefined();
            expect(error.errors.history).toBeUndefined();
        }
    });

    it('should validate email format', async () => {
        const user = new UserModel({
            email: 'invalidemail',
            password: 'mypassword',
            history: [],
        });

        try {
            await user.save();
        } catch (error: any) {
            expect(error.errors.email.message).toBe('Invalid email format');
        }
    });

    it('should hash password before saving', async () => {
        const rawPassword = 'secret123';
        const user = new UserModel({
            email: 'hash@test.com',
            password: rawPassword,
            history: [],
        });

        const savedUser = await user.save();
        expect(savedUser.password).not.toBe(rawPassword);
    });

    it('should compare passwords correctly', async () => {
        const rawPassword = 'mypassword';
        const user = new UserModel({
            email: 'compare@test.com',
            password: rawPassword,
            history: [],
        });

        await user.save();
        const foundUser = await UserModel.findOne({ email: 'compare@test.com' });
        const isMatch = await foundUser!.comparePassword(rawPassword);

        expect(isMatch).toBe(true);
    });

    it('should return false for incorrect password', async () => {
        const user = new UserModel({
            email: 'wrong@test.com',
            password: 'correctpassword',
            history: [],
        });

        await user.save();
        const foundUser = await UserModel.findOne({ email: 'wrong@test.com' });
        const isMatch = await foundUser!.comparePassword('wrongpassword');

        expect(isMatch).toBe(false);
    });
});
