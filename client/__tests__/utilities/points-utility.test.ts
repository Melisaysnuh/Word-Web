import { expect,  describe, test } from 'vitest';
import { calculateTotalPoints } from '../../src/utilities/points-utility';
import { wordListMock } from './mocks.mock';





    describe('calculate points', () => {
        test('it should receive a list and filter any words that dont contain a given letter', async () => {
            const testResult = calculateTotalPoints(wordListMock);
            expect(testResult).toBeTruthy();
            expect(testResult).toBeTypeOf("number");
            expect(testResult).toBe(22            )

        });
    });
