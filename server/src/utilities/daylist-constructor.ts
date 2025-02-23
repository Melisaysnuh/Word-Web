import { Daylist } from '../types/Daylist.js';
import { generateAnagrams } from './generate-anagrams.js';
import { centerFilter } from './center-filter.js';
import { pangrams } from './get-pangrams.js';
import { calculatePoints } from './calculate-score.js';
import { calculateTotal } from './calculate-total.js';
import { getArray, validateWord } from './word-list-mgmt.js';
import { format } from 'date-fns';
const now = format(new Date(), "yyyy_MM_dd");
import { getRandomWord } from './get-random-word.js';
import { getCenter } from './get-center.js';





async function validWordArray (list: string[]) {
    try {
        const validWords = [];
        for (let i = 0; i < list.length; i++) {
            const item = list[i];
            const isValid = await validateWord(item);
            if (isValid) {
                validWords.push(item)
            }
        }
        return validWords;
    }
    catch (e) {
        console.log('error validating array: ', e)

    }
}



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

            console.log('in line 49');
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



               //  const center = await getCenter(anagrams, word)
                // can't remember why i have this
                // uniqueArray.splice(index, 1);
                // uniqueArray.unshift(center);
               // if (center) {
                /* const filteredAnagrams = centerFilter(anagrams, center);
                 const anagrams3 = await validWordArray(filteredAnagrams);
                if (filteredAnagrams) {
                    const todaysPangrams = pangrams(filteredAnagrams, uniqueArray);
                    const anagramObjList = filteredAnagrams.map((word) => {
                        return calculatePoints(word, todaysPangrams)
                    })} */



                }




    catch (e) {
        console.log('fetch error in constructor', e)
    }
}



async function testFunc () {
    const result = await finalConstructor();
    if (result) {
        console.log(result)
    }
}
testFunc();