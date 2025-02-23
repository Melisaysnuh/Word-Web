import { expect, MockedFunction, describe, test, vi } from 'vitest';
import dotenv from 'dotenv';
dotenv.config();
import { getArray, validateWord, removeInvalidWord } from '../src/utilities/word-list-mgmt';
import { anagramListMock, twoLetterMock } from './mocks/mocks.mock';
import { generateAnagrams } from '../src/utilities/generate-anagrams';

/// <reference types="vitest" />
vi.mock('../src/utilities/word-list-mgmt', () => ({
    validateWord: vi.fn(),
    removeInvalidWord: vi.fn(),
    getArray: vi.fn()
}));

vi.mock('../src/utilities/generate-anagrams', () => ({
    generateAnagrams: vi.fn()
}));



describe('Testing for Daylist Constructor utilites', () => {
    describe('getArray', () => {
        test('should filter word list words with length between given parameters', async () => {
            (getArray as unknown as MockedFunction<typeof getArray>).mockResolvedValue(twoLetterMock);
            const result = await getArray(1, 2);
            expect(result).toBeTypeOf('object');
            expect(result).not.toHaveLength(0);
            expect(result.every(word => word.length >= 1 && word.length <= 2)).toBe(true);
        });
    });

    describe('validateWord', () => {
        test('should validate word via API', async () => {
            (validateWord as unknown as MockedFunction<typeof validateWord>)
                .mockResolvedValueOnce(false) // "abactor" should return false
                .mockResolvedValueOnce(true)  // "coactor" should return true
                .mockResolvedValueOnce(false); // "abacs" should return false

            await expect(validateWord("abactor")).resolves.toBe(false);
            await expect(validateWord("aerobic")).resolves.toBe(true);
            await expect(validateWord("parsing")).resolves.toBe(false);
        });
    });

    describe('removeInvalidWord', () => {
        test('should remove invalid words from word list', async () => {
            (removeInvalidWord as unknown as MockedFunction<typeof removeInvalidWord>)
                .mockResolvedValueOnce();
            await expect(removeInvalidWord('')).resolves.toBeFalsy();
        });
    });

    describe('generateAnagrams', () => {
        test('should receive a word and an array and return only words that are anagrams and between 4 and 12 characters', async () => {
            (generateAnagrams as unknown as MockedFunction<typeof generateAnagrams>).mockResolvedValue(anagramListMock);
            const result = await generateAnagrams('scatter', anagramListMock);
            expect(result).toBeTypeOf('object');
            expect(result).not.toHaveLength(0);
            expect(result.every(word => word.match(`^['scatter']+$`))).toBe(true);
            expect(result.every(word => word.length >= 4 && word.length <= 12)).toBe(true);
        });
    });
});
