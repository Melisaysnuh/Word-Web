import fs from 'fs';
import { Daylist } from '../types/Daylist.js';
import { countLength } from './count-length.js';
import { generateAnagrams } from './generate-anagrams.js';
import { centerFilter } from './center-filter.js';
import { pangrams } from './get-pangrams.js';
import { calculatePoints } from './calculate-score.js';
import { calculateTotal } from './calculate-total.js';
import {configDotenv} from 'dotenv';
configDotenv();
import { format } from 'date-fns';
const now = format(new Date(), "yyyy_MM_dd");


// ABOUT: This is my backend service, that will eventually run  once a day at 8 a.m. to generate the letters and words for the daily game. It uses a word list to get the words, as well as merriam webster's free api to validate that word variants or non-words aren't included. the word list i chose is filtered for profanity, or else that would be included here.

// FETCH WORD LISTS
async function getLongArray (){
    const wordListPath = await import('word-list').then(module => module.default);
    const mainWordArray = fs.readFileSync(wordListPath, 'utf8').split('\n').filter((word: string) => word.length >= 4);
    return mainWordArray.filter((word: string) => word.length >= 7);
}


// // HELPER:  async function to validate word by checking it in merriam webster api


async function validateWord (word: string): Promise<boolean> {
    try {
        const url = process.env.API_BASE_URL;
        const apiKey = process.env.API_KEY;
        console.log('URL after update: ', url);
        const res = await fetch(`${url}${word}${apiKey}`);
        if (res.ok) {
            const data = await res.json();
            if (data && typeof data[0] === 'object' && data[0].meta.id === word) {
                return true;
            }
            else { return false; }
        }
        else throw new Error(`Response: ${res.status}`);
    }
    catch (e) {
        console.error('error validating word in api', e)
        throw e;
    }
}

// GET RANDOM WORD
// Recursive function to select a random word, and check that it has 7 unique letters and is valid. Makes entire service async
async function getRandomWord () {
    try {
        const longArray = await getLongArray()
        const rand = Math.floor(Math.random() * longArray.length);
        const test: string = longArray[rand];
        if (countLength(test) === 7) {
            const result: boolean = await (validateWord(test))
            if (result)
                return test
        }

        return getRandomWord()
            ;
    }
    catch (e) {
        console.log('error in getRandomWord: ', e)

    }
}


/* // FIND CENTER LETTER FOR GAME (MOST COMMON)
async function getCenter (list: string[], word: string) {
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
 */
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
} */



// *CONSTRUCT OUR LIST AND EXPORT
export async function finalConstructor (): Promise<Daylist | undefined> {
    try {
        const mainWordArray = await getLongArray()
        console.log('in constructor');
        const word = await getRandomWord();
        if (word) {
            const letterArray = word.split('');
            const uniqueArray = letterArray.filter((value, index, array) => array.indexOf(value) === index);
            const anagrams = generateAnagrams(word, mainWordArray);


                const index = Math.floor(Math.random()*7);
                const center = uniqueArray[index];
                uniqueArray.splice(index, 1);
                uniqueArray.unshift(center);

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
                        totalPoints: calculateTotal(anagramObjList),
                        validWords: anagramObjList,
                        sessions: []
                    }
                }


        }
        else throw new Error('error in final constructor')
    }
    catch (e) {
        console.log('fetch error in constructor', e)
    }
}



