import { expect, describe, test, vi } from 'vitest';
import * as wordListMgmt from  '../src/utilities/word-list-mgmt'

vi.mock('../src/utilities/word-list-mgmt', () => ({
    validateWord: vi.fn(),
    removeInvalidWord: vi.fn(),
    getArray: vi.fn()
}));


describe('daylist Constructor', () => {
    test('should call all utility functions', async () => {

        /* const getArraySpy = vi.spyOn(wordListMgmt, wordListMgmt.getArray); */

        expect(getArraySpy).toHaveBeenCalled()
    });
});