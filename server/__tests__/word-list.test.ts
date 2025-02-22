import { expect, test, vi } from 'vitest';
import { getArray, validateWord, removeInvalidWord } from '../src/utilities/word-list-mgmt';
import { mockWordArray } from './mocks/wordResponse.mock';


vi.mock('../src/utilities/word-list-mgmt', () => ({
    validateWord: vi.fn(),
    removeInvalidWord: vi.fn(),
    getArray: vi.fn()
}));

test('should filter word list words with length between given parameters', async () => {

    (getArray as unknown as vi.Mock).mockResolvedValue(mockWordArray);

    const result = await getArray(1,2);

    expect(result).toBeTypeOf('object');
    expect(result).not.toHaveLength(0);
    expect(result.every(word => word.length >= 1 && word.length <= 2)).toBe(true);

});


test('validate word via API', async () => {


    (validateWord as unknown as vi.Mock)
        .mockResolvedValueOnce(false) // "abactor" should return false
        .mockResolvedValueOnce(true)  // "coactor" should return true
        .mockResolvedValueOnce(false); // "abacs" should return false

    await expect(validateWord("abactor")).resolves.toBe(false);
    await expect(validateWord("coactor")).resolves.toBe(true);
    await expect(validateWord("abacs")).resolves.toBe(false);


})

test('should remove invalid words from word list', async () => {
    (removeInvalidWord as unknown as vi.Mock)
    .mockResolvedValueOnce()
    await expect(removeInvalidWord('')).resolves.toBeFalsy();

})