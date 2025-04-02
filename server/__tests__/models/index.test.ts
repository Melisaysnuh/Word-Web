import { vi, describe, it, afterEach, expect } from 'vitest';
import mongoose from 'mongoose';
import * as index from '../../src/Models/index'; // Ensure correct path

describe('Database Connection', () => {
    afterEach(() => {
        vi.restoreAllMocks(); // Reset spies after each test
    });

    it('should connect to MongoDB successfully', async () => {
        // Spy on the actual connection function
        const connectionSpy = vi.spyOn(mongoose, 'connect').mockResolvedValueOnce({} as any);

        const response = await index.connectDB();

        expect(connectionSpy).toHaveBeenCalledOnce();
        expect(connectionSpy).toHaveBeenCalledWith('mongodb://localhost:27017/wordweb');
        expect(response).toEqual({ statusCode: 200 });
    });

    it('should handle database connection failure', async () => {
        // Mock mongoose.connect to reject
        const connectionSpy = vi.spyOn(mongoose, 'connect').mockRejectedValueOnce(new Error('DB connection failed'));

        const response = await index.connectDB();

        expect(connectionSpy).toHaveBeenCalledOnce();
        expect(response).toEqual({ statusCode: 500, message: 'internal server error.' });
    });
});

describe('Mongoose Model', () => {
    it('should define the "dayModel" correctly', () => {
        expect(index.dayModel).toBeDefined();
        expect(index.dayModel.modelName).toBe('word-web');
    });

    it('should have the correct schema structure', () => {
        const schemaPaths = Object.keys(index.dayModel.schema.paths);

        expect(schemaPaths).toContain('daylist_id');
        expect(schemaPaths).toContain('centerLetter');
        expect(schemaPaths).toContain('pangrams');
        expect(schemaPaths).toContain('totalPoints');
        expect(schemaPaths).toContain('letters');
        expect(schemaPaths).toContain('validWords');
        expect(schemaPaths).toContain('sessions');

        expect(index.dayModel.schema.path('daylist_id').instance).toBe('String');
        expect(index.dayModel.schema.path('centerLetter').instance).toBe('String');
        expect(index.dayModel.schema.path('pangrams').instance).toBe('Array');
        expect(index.dayModel.schema.path('totalPoints').instance).toBe('Number');
    });
});
