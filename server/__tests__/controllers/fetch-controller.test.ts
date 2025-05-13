import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { loadLettersController } from '../../src/controllers/fetch-controller';
import { fetchListModel } from '../../src/Models/ListModel';
import { Request, Response } from 'express';

// Mock fetchListModel to simulate different scenarios
vi.mock('../../src/Models/ListModel', () => ({
    fetchListModel: vi.fn(),
}));

describe('loadLettersController', () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let jsonSpy: vi.SpyInstance;

    beforeEach(() => {
        // Set up mock request and response objects
        mockReq = {};
        mockRes = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn(),
        };
        jsonSpy = vi.spyOn(mockRes, 'json');
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should return 200 and the list if found', async () => {
        const mockList = { daylist_id: '2025_04_02', words: ['apple', 'banana'] };

        // Mock fetchListModel to return a mock list
        (fetchListModel as vi.Mock).mockResolvedValueOnce(mockList);

        await loadLettersController(mockReq as Request, mockRes as Response);

        // Check if the correct response status and data are sent
        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(jsonSpy).toHaveBeenCalledWith({ list: mockList });
    });

    it('should return 404 if the list is not found', async () => {
        // Mock fetchListModel to return null (list not found)
        (fetchListModel as vi.Mock).mockResolvedValueOnce(null);

        await loadLettersController(mockReq as Request, mockRes as Response);

        // Check if the correct response status and error message are sent
        expect(mockRes.status).toHaveBeenCalledWith(405);
        expect(jsonSpy).toHaveBeenCalledWith({ message: 'List not found' });
    });

    it('should return 500 if there is an error fetching the list', async () => {
        // Mock fetchListModel to throw an error
        (fetchListModel as vi.Mock).mockRejectedValueOnce(new Error('Database error'));

        await loadLettersController(mockReq as Request, mockRes as Response);

        // Check if the correct response status and error message are sent
        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(jsonSpy).toHaveBeenCalledWith({ message: 'Internal server error' });
    });
});
