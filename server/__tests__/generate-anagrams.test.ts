import { expect, test, vi } from 'vitest';
import { anagramListMock } from './mocks/mocks';
import { generateAnagrams } from '../src/utilities/generate-anagrams';

vi.mock('../src/utilities/generate-anagrams', () => ({
    generateAnagrams: vi.fn()
}));

test('should receive a word and an array and filter out all anagrams', async () => {

    (generateAnagrams as unknown as vi.Mock).mockResolvedValue(anagramListMock);

    const result = await generateAnagrams('scatter', anagramListMock);

    expect(result).toBeTypeOf('object');
    expect(result).not.toHaveLength(0);

})

