import { expect,  describe, test, vi } from 'vitest';
import { anagramListMock, mock7LetterArray, mockPangramsArray, wordString1, wordString2, wordString3 } from '../mocks/mocks.mock';
import * as wordListMgmt from '../../src/utilities/utilities'


/* vi.mock('../../src/utilities/utilities', () => ({
    generateAnagrams: vi.fn().mockResolvedValue(anagramListMock)
})); */

describe('utility functions', () => {
    describe('generate-Anagrams', () => {
        test('should receive a word and an array and return only words that are anagrams and between 4 and 12 characters', async () => {
           // (wordListMgmt.generateAnagrams as unknown as MockedFunction<typeof wordListMgmt.generateAnagrams>)
            const result = wordListMgmt.generateAnagrams('scatter', anagramListMock);
            expect(result).toBeTypeOf('object');
            expect(result).not.toHaveLength(0);
            expect(result.every(word => word.match(`^['scatter']+$`))).toBe(true);
            expect(result.every(word => word.length >= 4 && word.length <= 12)).toBe(true);
        });
    });

    describe('calculate points', () => {
        test('it should receive a word and the list of pangrams and calculate the points for that word', async () => {
            const testResult1 = wordListMgmt.calculatePoints(wordString1, mockPangramsArray);
            const testResult2 = wordListMgmt.calculatePoints(wordString2, mockPangramsArray);
            const testResult3 = wordListMgmt.calculatePoints(wordString3, mockPangramsArray);
            expect(testResult1).toBeTruthy();
            expect(testResult2).toBeTruthy();
            expect(testResult3).toBeTruthy();

            expect(testResult1).toBeTypeOf("object");
            expect(testResult1.points).toBe(6);
            expect(testResult1.pangram).toBe(false);

            expect(testResult2).toBeTypeOf("object");
            expect(testResult2.points).toBe(14);
            expect(testResult2.pangram).toBe(true);

            expect(testResult3).toBeTypeOf("object");
            expect(testResult3.points).toBe(1);
            expect(testResult3.pangram).toBe(false);


        });
    });


    describe('center filter', () => {
        test('it should receive a list and filter any words that dont contain a given letter', async () => {
            const testResult = wordListMgmt.centerFilter(anagramListMock, 's');
            expect(testResult).toBeTruthy();
            expect(testResult).toBeTypeOf("object");
            expect(testResult).toContain('asar'
            )

        });
    });
    describe('get center', () => {
        test('it should determine the center letter based on a list that will return no more than 50 words for that days list', async () => {
            const testResult = await wordListMgmt.getCenter(anagramListMock, ['s', 'c', 'a', 't']);
            expect(testResult).toBeTruthy();
            expect(testResult).toBeTypeOf("string");


        });
    });
    describe('pangram finder', () => {
        test('it should receive a list of words determine if each word is a pangram or not', async () => {
            const pangramsSpy = vi.spyOn(wordListMgmt, 'pangrams');
            const testResult = await wordListMgmt.pangrams(["alba", "alibi", "bail", "bald", "ball", "barb", "bard", "basil", "bias", "bird", 'billiards'], mock7LetterArray);

            expect(pangramsSpy).toHaveBeenCalled();
            expect(testResult).toBeTypeOf('object');
            expect(testResult).toHaveLength(1);

        });
    });

});

