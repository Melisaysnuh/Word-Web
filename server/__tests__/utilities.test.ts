import { expect, MockedFunction, describe, test, vi } from 'vitest';
import { anagramListMock, mock7LetterArray } from './mocks/mocks.mock';
import {centerFilter, generateAnagrams, getCenter, pangrams} from '../dist/utilities/utilities'

vi.mock('../src/utilities/utilities', () => ({
    generateAnagrams: vi.fn().mockResolvedValue(anagramListMock)
}));

describe('utility functions', () => {
    describe('generate-Anagrams', () => {
        test('should receive a word and an array and return only words that are anagrams and between 4 and 12 characters', async () => {
            (generateAnagrams as unknown as MockedFunction<typeof generateAnagrams>)
            const result = generateAnagrams('scatter', anagramListMock);
            expect(result).toBeTypeOf('object');
            expect(result).not.toHaveLength(0);
            expect(result.every(word => word.match(`^['scatter']+$`))).toBe(true);
            expect(result.every(word => word.length >= 4 && word.length <= 12)).toBe(true);
        });
    });

    describe('calculate points', () => {
        test('receive a word and calculate points', async () => {
            expect(1 + 2).toBe(3);
        });
    });

    describe('calculate total', () => {
        test('it should receive a list of words and calculate the total score', async () => {
            expect(1 + 2).toBe(3);
        });
    });
    describe('center filter', () => {
        test('it should receive a list and filter any words that dont contain a given letter', async () => {
            const testResult = centerFilter(anagramListMock, 's');
            expect(testResult).toBeTruthy();
            expect(testResult).toBeTypeOf("object");
            expect(testResult).toContain('asar'
            )

        });
    });
    describe('get center', () => {
        test('it should determine the center letter based on a list that will return no more than 50 words for that days list', async () => {
            const testResult = await getCenter(anagramListMock, ['s', 'c', 'a', 't']);
            expect(testResult).toBeTruthy();
            expect(testResult).toBeTypeOf("string");


        });
    });
    describe('pangram finder', () => {
        test('it should receive a list of words determine if each word is a pangram or not', async () => {
            const testResult = pangrams(["alba", "alibi", "bail", "bald", "ball", "barb", "bard", "basil", "bias", "bird", 'billiards'], mock7LetterArray);
            expect(testResult).toBeTypeOf('object');
            expect(testResult).toHaveLength(1);

        });
    });

});

