import { describe, it, expect, vi, beforeEach, afterEach, MockedFunction } from 'vitest';
import * as gdlist from '../../src/services/list-service';
import { mockApiResponse } from './response.mock';
import { format } from 'date-fns';
const now = format(new Date(), "yyyy_MM_dd");
//import { ListBackUpTemp } from "../../src/services/list-backup";

// Helper to mock localStorage
const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
        getItem: vi.fn((key: string) => store[key] || null),
        setItem: vi.fn((key: string, value: string) => {
            store[key] = value;
        }),
        clear: vi.fn(() => {
            store = {};
        }),
        removeItem: vi.fn((key: string) => {
            delete store[key];
        }),
    };
})();

describe('getDailyListService', () => {
    beforeEach(() => {
        vi.resetModules();
        vi.clearAllMocks();

        // @ts-expect-error tofix
        global.localStorage = localStorageMock;
        // @ts-expect-error tofix
        global.fetch = vi.fn();
        localStorageMock.clear();
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('fetches from API if no cache exists', async () => {
        // @ts-expect-error tofix
        (global.fetch as MockedFunction).mockResolvedValueOnce({
            json: vi.fn().mockResolvedValue(mockApiResponse),
        });

        const result = await gdlist.getDailyListService();

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(result).toEqual(mockApiResponse);
        expect(localStorage.setItem).toHaveBeenCalledWith(
            'cachedDailyList',
            JSON.stringify(mockApiResponse)
        );
    });

    it('returns cached list if valid', async () => {
        // Manually set the correct format in cache
        localStorage.setItem(
            'cachedDailyList',
            JSON.stringify({
                list: {
                    ...mockApiResponse,
                    daylist_id: now
                },
            })
        );

        const result = await gdlist.getDailyListService();

        expect(fetch).not.toHaveBeenCalled();
        expect(result.list.daylist_id).toEqual(
            now
        );
    });

    /* it('uses backup if fetch fails', async () => {
        (global.fetch as unknown as vi.Mock).mockRejectedValueOnce(new Error('API is down'));

        // Clear localStorage to simulate no cache
        localStorage.clear();

        const result = await gdlist.getDailyListService();

        // Should fallback to backup if fetch fails
        expect(result).toEqual(ListBackUpTemp);
        expect(fetch).toHaveBeenCalledTimes(1);
    }); */
});
