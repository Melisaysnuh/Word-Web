import { expect, MockedFunction, test, vi } from 'vitest';
import { anagramListMock } from './mocks/mocks.mock';
import { generateAnagrams } from '../src/utilities/generate-anagrams';
/// <reference types="vitest" />
vi.mock('../src/utilities/generate-anagrams', () => ({
    generateAnagrams: vi.fn()
}));

test('should receive a word and an array and return only words that are anagrams and between 4 and 12 characters', async () => {

    (generateAnagrams as unknown as MockedFunction<typeof generateAnagrams>).mockResolvedValue(anagramListMock);

    const result = await generateAnagrams('scatter', anagramListMock);

    expect(result).toBeTypeOf('object');
    expect(result).not.toHaveLength(0);
    expect(result.every(word => word.match(`^['scatter']+$`))).toBe(true);
    expect(result.every(word => word.length >= 4 && word.length <= 12)).toBe(true);
})

