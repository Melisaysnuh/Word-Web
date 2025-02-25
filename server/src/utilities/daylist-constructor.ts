import { Daylist } from '../types/Daylist.js';
import { generateAnagrams, getCenter, centerFilter, pangrams, calculatePoints, calculateTotal } from './utilities.js';
import { getArray, getRandomWord, validWordArray } from './word-list-mgmt.js';
import { format } from 'date-fns';
const now = format(new Date(), "yyyy_MM_dd");


// *CONSTRUCT OUR LIST AND EXPORT
export async function finalConstructor (): Promise<Daylist | undefined> {
    try {
        console.log('in daylist constructor');
        const mainWordArray = await getArray(4, 12)
        const word = await getRandomWord();
        if (word) {
            const letterArray = word.split('');
            const uniqueArray = letterArray.filter((value, index, array) => array.indexOf(value) === index);
            const anagrams = generateAnagrams(word, mainWordArray);
            const validWordAnagrams = await validWordArray(anagrams);
            if (validWordAnagrams) {
                const center = await getCenter(validWordAnagrams, uniqueArray);
                if (center) {
                    const filteredAnagramsbyCenter = centerFilter(validWordAnagrams, center)
                    const todaysPangrams = pangrams(filteredAnagramsbyCenter, uniqueArray);
                    const anagramObjList = filteredAnagramsbyCenter.map((word: string) => {
                        return calculatePoints(word, todaysPangrams)
                    });
                    return {
                        id: now,
                        centerLetter: center,
                        pangrams: todaysPangrams,
                        letters: uniqueArray,
                        totalPossiblePoints: calculateTotal(anagramObjList),
                        validWords: anagramObjList,

                    }
                }
            }
        }
    }

    catch (e) {
        console.log('fetch error in constructor', e)
    }
}



