import { expect, describe, test, vi, MockedFunction } from 'vitest';
import * as wordListMgmt from  '../src/utilities/word-list-mgmt'
import * as utilities from  '../src/utilities/utilities'
import finalConstructor from '../src/utilities/daylist-constructor'
import { twoLetterMock } from './mocks/mocks.mock';


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
    /*test('Should call validWord', async () => {
        (wordListMgmt.getArray as unknown as MockedFunction<typeof wordListMgmt.getArray>).mockResolvedValue(twoLetterMock);

        const validWordArraySpy = vi.spyOn(wordListMgmt, 'validWordArray');
        await finalConstructor();
        expect(validWordArraySpy).toHaveBeenCalledOnce()

    });

    test('Should handle errors for validWord', async () => {
        // Mock getArray to throw an error
        wordListMgmt.getArray.mockRejectedValueOnce(new Error('API Error'));

        const consoleSpy = vi.spyOn(console, 'log');

        await finalConstructor();

        expect(consoleSpy).toHaveBeenCalledWith('fetch error in constructor', expect.any(Error));

        const result = await finalConstructor();
        expect(result).toBeUndefined();
    });
     test('With randomword, should call getCenter', async () => {
        (wordListMgmt.getArray as unknown as MockedFunction<typeof wordListMgmt.getArray>).mockResolvedValue(twoLetterMock);
        const getArraySpy = vi.spyOn(wordListMgmt, 'getArray');
        const validateWordSpy = vi.spyOn(wordListMgmt, 'validateWord');
        const removeInvalidWordSpy = vi.spyOn(wordListMgmt, 'removeInvalidWord');
        const getRandomWordSpy = vi.spyOn(wordListMgmt, 'getRandomWord');
        const validWordArraySpy = vi.spyOn(wordListMgmt, 'validWordArray');

        const calculatePointsSpy = vi.spyOn(utilities, 'calculatePoints');
        const centerFilterSpy = vi.spyOn(utilities, 'centerFilter');
        const generateAnagramsSpy = vi.spyOn(utilities, 'generateAnagrams');
        const getCenterSpy = vi.spyOn(utilities, 'getCenter');
        const pangramsSpy = vi.spyOn(utilities, 'pangrams');


        await finalConstructor();

        expect(getArraySpy).toHaveBeenCalledOnce()

        expect(validateWordSpy).toHaveBeenCalledOnce()
        expect(removeInvalidWordSpy).toHaveBeenCalledOnce()
        expect(getRandomWordSpy).toHaveBeenCalledOnce()
        expect(validWordArraySpy).toHaveBeenCalledOnce()
        //expect(calculatePointsSpy).toHaveBeenCalledOnce()
        //expect(centerFilterSpy).toHaveBeenCalledOnce()
        //expect(generateAnagramsSpy).toHaveBeenCalledOnce()
        //expect(getCenterSpy).toHaveBeenCalledOnce()
        //expect(pangramsSpy).toHaveBeenCalledOnce()


    });

    test('should handle errors for getCenter', async () => {
        // Mock getArray to throw an error
        wordListMgmt.getArray.mockRejectedValueOnce(new Error('API Error'));

        const consoleSpy = vi.spyOn(console, 'log');

        await finalConstructor();

        expect(consoleSpy).toHaveBeenCalledWith('fetch error in constructor', expect.any(Error));

        const result = await finalConstructor();
        expect(result).toBeUndefined();
    });
    test('With getCenter, call centerFilter, panGrams, calculatePoints', async () => {
        (wordListMgmt.getArray as unknown as MockedFunction<typeof wordListMgmt.getArray>).mockResolvedValue(twoLetterMock);
        const getArraySpy = vi.spyOn(wordListMgmt, 'getArray');
        const validateWordSpy = vi.spyOn(wordListMgmt, 'validateWord');
        const removeInvalidWordSpy = vi.spyOn(wordListMgmt, 'removeInvalidWord');
        const getRandomWordSpy = vi.spyOn(wordListMgmt, 'getRandomWord');
        const validWordArraySpy = vi.spyOn(wordListMgmt, 'validWordArray');

        const calculatePointsSpy = vi.spyOn(utilities, 'calculatePoints');
        const centerFilterSpy = vi.spyOn(utilities, 'centerFilter');
        const generateAnagramsSpy = vi.spyOn(utilities, 'generateAnagrams');
        const getCenterSpy = vi.spyOn(utilities, 'getCenter');
        const pangramsSpy = vi.spyOn(utilities, 'pangrams');


        await finalConstructor();

        expect(getArraySpy).toHaveBeenCalledOnce()

        expect(validateWordSpy).toHaveBeenCalledOnce()
        expect(removeInvalidWordSpy).toHaveBeenCalledOnce()
        expect(getRandomWordSpy).toHaveBeenCalledOnce()
        expect(validWordArraySpy).toHaveBeenCalledOnce()
        //expect(calculatePointsSpy).toHaveBeenCalledOnce()
        //expect(centerFilterSpy).toHaveBeenCalledOnce()
        //expect(generateAnagramsSpy).toHaveBeenCalledOnce()
        //expect(getCenterSpy).toHaveBeenCalledOnce()
        //expect(pangramsSpy).toHaveBeenCalledOnce()


    });

    test('should handle errors for centerFilter, pangrams, calculatePoints', async () => {
        // Mock getArray to throw an error
        wordListMgmt.getArray.mockRejectedValueOnce(new Error('API Error'));

        const consoleSpy = vi.spyOn(console, 'log');

        await finalConstructor();

        expect(consoleSpy).toHaveBeenCalledWith('fetch error in constructor', expect.any(Error));

        const result = await finalConstructor();
        expect(result).toBeUndefined();
    }); */
});