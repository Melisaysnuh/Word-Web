import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as gdlist from '../../src/services/list-service';
import { mockApiResponse } from './response.mock';
let cacheTimestamp: number = 0;





describe('getDailyList', () => {
    beforeEach(() => {

        vi.clearAllMocks();
        global.fetch = vi.fn();
    });

    it('should fetch the daily list from the API if no cache exists', async () => {

        global.fetch.mockResolvedValueOnce({
            json: vi.fn().mockResolvedValue(mockApiResponse),
        });

        const result = await gdlist.getDailyList();

        // Check if the API call is made
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(`${gdlist.base_URL}/`, expect.any(Object));

        expect(result).toEqual(mockApiResponse);
    });

    it('should return cached data and not call the API if cache is valid', async () => {

        global.fetch.mockResolvedValueOnce({
            json: vi.fn().mockResolvedValue(mockApiResponse),
        });
        await gdlist.getDailyList();

        vi.clearAllMocks();

        const result = await gdlist.getDailyList();


        expect(fetch).not.toHaveBeenCalled();


        expect(result).toEqual(mockApiResponse);
    });

    // todo fix in feature
    it('should refetch the daily list from the API if cache has expired', async () => {

        global.fetch.mockResolvedValueOnce({
            json: vi.fn().mockResolvedValue(mockApiResponse),
        });


        await gdlist.getDailyList();

        const CACHE_EXPIRATION_TIME = 60 * 90 * 1000;
        const mockExpiredTimestamp = Date.now() - CACHE_EXPIRATION_TIME - 1000;
        cacheTimestamp = mockExpiredTimestamp;

        

        global.fetch.mockResolvedValueOnce({
            json: vi.fn().mockResolvedValue(mockApiResponse),
        });

        const result = await gdlist.getDailyList();
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(result).toEqual(mockApiResponse);

    });
});
