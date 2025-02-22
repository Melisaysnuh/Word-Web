import { Daylist } from '../types/Daylist.js';
import { generateAnagrams } from './generate-anagrams.js';
import { centerFilter } from './center-filter.js';
import { pangrams } from './get-pangrams.js';
import { calculatePoints } from './calculate-score.js';
import { calculateTotal } from './calculate-total.js';
import { getArray, validateWord } from './word-list-mgmt.js';
import { format } from 'date-fns';
const now = format(new Date(), "yyyy_MM_dd");




// GET RANDOM WORD
// Recursive function to select a random word, and check that it has 7 unique letters and is valid. Makes entire service async
export async function getRandomWord() {
    try {
        const longArray = await getArray(7, 7);
        const rand = Math.floor(Math.random() * longArray.length);
        const candidate: string = longArray[rand];
        console.log(candidate);
        const regex = /^(?!.*(.).*\1)[a-z]+$/;
        if (candidate.length === 7 && regex.test(candidate)) {
            const result: boolean = await validateWord(candidate);
            if (result)
                return candidate
        }

     return getRandomWord()
            ;
    }
    catch (e) {
        console.log('error in getRandomWord: ', e)

    }
}


 // FIND CENTER LETTER FOR GAME (LEAST COMMON)
export async function getCenter (list: string[], word: string) {
    try {

        const thisResult: { [key: string]: number } = {};
        const mainArray = word.split('');

        Array.from(new Set(mainArray)).forEach(letter => {
            const { length } = mainArray.filter(l => l === letter);
            thisResult[letter] = length;
        });

        for (const item of list) {
            const itemArray = item.split("");
            Array.from(new Set(itemArray)).forEach(letter => {
                const { length } = itemArray.filter(l => l === letter);
                thisResult[letter] += length;
            });
        }
        const highestLetter = Object.keys(thisResult).reduce((a, b) => { return thisResult[a] > thisResult[b] ? a : b });
        return highestLetter
    }
    catch (e) {
        console.log('error in getting center letter: ', e)
    }
}

//todo fix this to remove weird words
/* async function validWordArray (list: string[]) {
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
 */


// *CONSTRUCT OUR LIST AND EXPORT
export async function finalConstructor (): Promise<Daylist | undefined> {
    try {
        const mainWordArray = await getArray(4, 12)
        const word = await getRandomWord();
        if (word) {
            const letterArray = word.split('');
            const uniqueArray = letterArray.filter((value, index, array) => array.indexOf(value) === index);
            const anagrams = generateAnagrams(word, mainWordArray);



                const center = await getCenter(anagrams, word)
                // can't remember why i have this
                // uniqueArray.splice(index, 1);
                // uniqueArray.unshift(center);
                if (center) {
                const filteredAnagrams = centerFilter(anagrams, center);
                /* const anagrams3 = await validWordArray(filteredAnagrams); */
                if (filteredAnagrams) {
                    const todaysPangrams = pangrams(filteredAnagrams, uniqueArray);
                    const anagramObjList = filteredAnagrams.map((word) => {
                        return calculatePoints(word, todaysPangrams)
                    })


                    return {
                        id: now,
                        centerLetter: center,
                        pangrams: todaysPangrams,
                        letters: uniqueArray,
                        totalPossiblePoints: calculateTotal(anagramObjList),
                        validWords: anagramObjList,

                    }
                }}


        }
        else throw new Error('error in final constructor')
    }
    catch (e) {
        console.log('fetch error in constructor', e)
    }
}



