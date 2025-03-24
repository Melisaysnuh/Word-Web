import { expect, describe, test, vi, MockedFunction } from 'vitest';
import * as wordListMgmt from  '../src/utilities/word-list-mgmt'
import * as utilities from  '../src/utilities/utilities'
import finalConstructor from '../src/utilities/daylist-constructor'
import { anagramListMock, twoLetterMock } from './mocks/mocks.mock';


vi.mock('../src/utilities/word-list-mgmt', () => ({
    getArray: vi.fn(),
    validateWord: vi.fn(),
    removeInvalidWord: vi.fn(),
    getRandomWord: vi.fn(),
    validWordArray: vi.fn(),

}));
vi.mock('../src/utilities/utilities', () => ({
    calculatePoints: vi.fn(),
    centerFilter: vi.fn(),
    generateAnagrams: vi.fn(),
    getCenter: vi.fn(),
    pangrams: vi.fn()


}));


describe('daylist Constructor', () => {
    test('should call getArray and getRandomWord', async () => {
        (wordListMgmt.getArray as unknown as MockedFunction<typeof wordListMgmt.getArray>).mockResolvedValue(twoLetterMock);
        const getArraySpy = vi.spyOn(wordListMgmt, 'getArray');
        const getRandomWordSpy = vi.spyOn(wordListMgmt, 'getRandomWord');

        await finalConstructor();

        expect(getArraySpy).toHaveBeenCalledOnce()
        expect(getRandomWordSpy).toHaveBeenCalledOnce()


    });

    test('should handle errors for getArray and getRandomWord', async () => {
        // Mock getArray to throw an error
        wordListMgmt.getArray.mockRejectedValueOnce(new Error('API Error'));
        wordListMgmt.getRandomWord.mockRejectedValueOnce(new Error('API Error'));

        const consoleSpy = vi.spyOn(console, 'log');

        await finalConstructor();

        expect(consoleSpy).toHaveBeenCalledWith('fetch error in constructor', expect.any(Error));

        const result = await finalConstructor();
        expect(result).toBeUndefined();
    });
    test('should call generateAnagrams', async () => {
        (wordListMgmt.getRandomWord as unknown as MockedFunction<typeof wordListMgmt.getRandomWord>).mockResolvedValue('drought');

        const generateAnagramsSpy = vi.spyOn(utilities, 'generateAnagrams');



        await finalConstructor();


        expect(generateAnagramsSpy).toHaveBeenCalledOnce()


    });

    test('should handle errors for generateAnagrams', async () => {
        // todo check actual handling of errors?
        utilities.generateAnagrams.mockRejectedValueOnce(new Error('API Error'));

        const consoleSpy = vi.spyOn(console, 'log');

        await finalConstructor();

        expect(consoleSpy).toHaveBeenCalledWith('fetch error in constructor', expect.any(Error));

        const result = await finalConstructor();
        expect(result).toBeUndefined();
    });
    test('Should call validWordArray', async () => {

        const validWordArraySpy = vi.spyOn(wordListMgmt, 'validWordArray');
        await finalConstructor();
        expect(validWordArraySpy).toHaveBeenCalledTimes(4)


    });

    test('Should handle errors for validWordArray', async () => {
        // Mock getArray to throw an error
        wordListMgmt.validWordArray.mockRejectedValueOnce(new Error('API Error'));

        const consoleSpy = vi.spyOn(console, 'log');

        await finalConstructor();

        expect(consoleSpy).toHaveBeenCalledWith('fetch error in constructor', expect.any(Error));

        const result = await finalConstructor();
        expect(result).toBeUndefined();
    });
     test('should call getCenter', async () => {
        (wordListMgmt.validWordArray as unknown as MockedFunction<typeof wordListMgmt.validWordArray>).mockResolvedValue(anagramListMock);
        const getCenterSpy = vi.spyOn(utilities, 'getCenter');


        await finalConstructor();

        expect(getCenterSpy).toHaveBeenCalledOnce()


    });

    test('should handle errors for getCenter', async () => {
        // Mock getArray to throw an error
        (utilities.getCenter as unknown as MockedFunction<typeof utilities.getCenter>).mockResolvedValue('i');

        const consoleSpy = vi.spyOn(console, 'log');

        await finalConstructor();

        expect(consoleSpy).toHaveBeenCalledWith('fetch error in constructor', expect.any(Error));

        const result = await finalConstructor();
        expect(result).toBeUndefined();
    });

    test('With getCenter, call centerFilter, panGrams, calculatePoints', async () => {
        (wordListMgmt.getRandomWord as unknown as MockedFunction<typeof wordListMgmt.getRandomWord>).mockResolvedValue('drought');
        (utilities.pangrams as unknown as MockedFunction<typeof utilities.pangrams>).mockResolvedValue(['drought']);
        (utilities.getCenter as unknown as MockedFunction<typeof utilities.getCenter>).mockResolvedValue('0');

        const calculatePointsSpy = vi.spyOn(utilities, 'calculatePoints');
        const centerFilterSpy = vi.spyOn(utilities, 'centerFilter');
        const pangramsSpy = vi.spyOn(utilities, 'pangrams');


        await finalConstructor();

        expect(calculatePointsSpy).toHaveBeenCalledOnce()
        expect(centerFilterSpy).toHaveBeenCalledOnce()
        expect(pangramsSpy).toHaveBeenCalledOnce()


    });

    test('should handle errors for centerFilter, pangrams, calculatePoints', async () => {
        // Mock getArray to throw an error
        wordListMgmt.getArray.mockRejectedValueOnce(new Error('API Error'));

        const consoleSpy = vi.spyOn(console, 'log');

        await finalConstructor();

        expect(consoleSpy).toHaveBeenCalledWith('fetch error in constructor', expect.any(Error));

        const result = await finalConstructor();
        expect(result).toBeUndefined();
    });
});