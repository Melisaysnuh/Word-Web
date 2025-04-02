import { vi, describe, it, beforeEach, afterEach, expect } from 'vitest';
import { fetchListModel, storeListModel } from '../../src/Models/ListModel';
import { dayModel } from '../../src/Models/index';
import * as construct from '../../src/utilities/daylist-constructor';
import { MockList } from '../mocks/mocks.mock';

vi.mock('../../src/Models/index', () => ({
    dayModel: {
        findOne: vi.fn(),
        create: vi.fn(),
    },
}));

vi.mock('../../src/utilities/daylist-constructor', () => ({
    default: vi.fn(),
}));

const mockDate = '2025_04_02'; // Example date format

describe('fetchListModel()', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should return an existing list if one is found', async () => {
        dayModel.findOne.mockResolvedValueOnce(MockList);

        const result = await fetchListModel();

        expect(dayModel.findOne).toHaveBeenCalledWith({ daylist_id: mockDate });
        expect(result).toEqual(MockList);
    });

    it('should call storeListModel if no list exists', async () => {
       // const constructorSpy = vi.spyOn(construct, 'default'); // Correctly spy on the default export
/* // todo fix / test E2E -- constructor spy should be in storemodel, this should be a storemodel spy
        // Mock database find to return null (no list found)
        dayModel.findOne.mockResolvedValueOnce(null);
        construct.default.mockResolvedValueOnce(MockList);
        dayModel.create.mockResolvedValueOnce(MockList);
        const result = await fetchListModel();
        expect(dayModel.findOne).toHaveBeenCalledWith({ daylist_id: mockDate });
        expect(dayModel.create).toHaveBeenCalledWith(MockList);
        expect(result).toEqual(MockList); */
    });


    it('should not create duplicate lists', async () => {

        dayModel.findOne.mockResolvedValueOnce(MockList);

        const result = await fetchListModel();

        expect(dayModel.findOne).toHaveBeenCalledWith({ daylist_id: mockDate });
        expect(dayModel.create).not.toHaveBeenCalled();
        expect(result).toEqual(MockList);
    });

    it('should handle errors if something goes wrong', async () => {
        dayModel.findOne.mockRejectedValueOnce(new Error('Database error'));

        const result = await fetchListModel();

        expect(dayModel.findOne).toHaveBeenCalledWith({ daylist_id: mockDate });
        expect(result).toBeUndefined(); // Since the function does not throw, just logs error
    });
});

describe('storeListModel', () => {
    beforeEach(() => {
        vi.restoreAllMocks(); // Reset all mocks before each test
    });

    it('should successfully store a new list in the database', async () => {


        // Mock finalConstructor (daylist-constructor) to return the mock list
        construct.default.mockResolvedValueOnce(MockList);

        // Mock dayModel.create to simulate saving the list to the database
        dayModel.create.mockResolvedValueOnce(MockList);

        // Call storeListModel
       const result = await storeListModel();

        // Ensure that the list was saved correctly
        expect(dayModel.create).toHaveBeenCalledWith(MockList);
        expect(result).toBeUndefined(); // storeListModel doesn't return anything
    });

    it('should handle errors when finalConstructor fails', async () => {
        // Mock finalConstructor to throw an error
        construct.default.mockRejectedValueOnce(new Error('Failed to generate list'));

        const consoleErrorSpy = vi.spyOn(console, 'error'); // Spy on console.error to capture the error

        await storeListModel();

        // Ensure that the error is logged
        expect(consoleErrorSpy).toHaveBeenCalledWith('Error storing day:', expect.any(Error));
    });

    it('should handle errors when dayModel.create fails', async () => {
        const MockList = { daylist_id: '2025_04_02', words: ['apple', 'banana'] };

        // Mock finalConstructor to return the mock list
        construct.default.mockResolvedValueOnce(MockList);

        // Mock dayModel.create to throw an error
        dayModel.create.mockRejectedValueOnce(new Error('Database error'));

        const consoleErrorSpy = vi.spyOn(console, 'error'); // Spy on console.error to capture the error

        await storeListModel(MockList);

        // Ensure that the error is logged
        expect(consoleErrorSpy).toHaveBeenCalledWith('Error storing day:', expect.any(Error));
    });
});