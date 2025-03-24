import { expect, describe, test, vi } from 'vitest';
import dotenv from 'dotenv';
dotenv.config();
import * as wordListMgmt from '../src/utilities/word-list-mgmt';



describe('word-list-mgmt', () => {
    describe('getArray', () => {
        test('should filter word list words with length between given parameters', async () => {
            const getArraySpy = vi.spyOn(wordListMgmt, 'getArray')
            const result = await wordListMgmt.getArray(1, 2);
            expect(getArraySpy).toBeCalledWith(1, 2);
            expect(result).toBeTypeOf('object');
            expect(result).not.toHaveLength(0);
            expect(result.every(word => word.length >= 1 && word.length <= 2)).toBe(true);
        });

    });

    describe('validateWord', () => {
        test('validateWord should validate word via API', async () => {
            const validateWordSpy = vi.spyOn(wordListMgmt, 'validateWord')
            const result = await wordListMgmt.validateWord('clever');
            expect(validateWordSpy).toBeCalledWith('clever');
            expect(validateWordSpy).toHaveResolved()
            expect(result).toBeTruthy();

        });
    });

    describe('removeInvalidWord', () => {
        test('should remove invalid words from word list', async () => {
            const removeInvalidWordSpy = vi.spyOn(wordListMgmt, 'removeInvalidWord')
            const result = await wordListMgmt.removeInvalidWord('aardwolves');
            expect(removeInvalidWordSpy).toHaveBeenCalled();
            expect(result).toBeFalsy();
        });
    });
    describe('getRandomWord', () => {
        test('should remove invalid words from word list', async () => {
            const getRandomWordSpy = vi.spyOn(wordListMgmt, 'getRandomWord')
            const result = await wordListMgmt.getRandomWord();
            expect(getRandomWordSpy).toHaveBeenCalled();
            expect(result).toBeTruthy();
            expect(result).toBeTypeOf('string')
        });
    });
    describe('validWordArray', () => {
        test('should remove invalid words from word list', async () => {
            const validWordArraySpy = vi.spyOn(wordListMgmt, 'validWordArray')
            //const validateWordSpy2 = vi.spyOn(wordListMgmt, 'validateWord')
            const result = await wordListMgmt.validWordArray([
                'abductee',
'abductees',
'abducting',
'abduction',
'abductator'
            ]);

            expect(validWordArraySpy).toHaveBeenCalled();
            // todo expect(wordListMgmt.validateWord).toHaveBeenCalledTimes(5);
            expect(result).toBeTruthy();
            expect(result).toBeTypeOf('object');
            expect(result).toHaveLength(4)
        });
    });


});
