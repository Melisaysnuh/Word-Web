import fs from 'fs';
import { Daylist } from '../types/Daylist.js';
import { count_length } from '../utilities/count_length.js';
import { generateAnagrams } from '../utilities/generate-anagrams.js';
import { centerFilter } from '../utilities/center-filter.js';
import { pangrams } from '../utilities/get-pangrams.js';
import { calculatePoints } from '../utilities/calculate-score.js';
import { calculateTotal } from '../utilities/calculate-total.js';
// ABOUT: This is my backend service, that will eventually run  once a day at 8 a.m. to generate the letters and words for the daily game. It uses a word list to get the words, as well as merriam webster's free api to validate that word variants or non-words aren't included. the word list i chose is filtered for profanity, or else that would be included here.

// FETCH WORD LISTS
const wordListPath = await import('word-list').then(module => module.default);
const mainWordArray = fs.readFileSync(wordListPath, 'utf8').split('\n').filter((word: string) => word.length >= 4);
let longArray = mainWordArray.filter((word: string) => word.length >= 7);

// // HELPER:  async function to validate word by checking it in merriam webster api
const base_url = 'https://www.dictionaryapi.com/api/v3/references/collegiate/json/';
const apiKey = '?key=c9d049a8-6724-4795-87f9-e091f2940fce';

async function validateWord (word: string): Promise<boolean> {
    try {
        const res = await fetch(`${base_url}${word}${apiKey}`);
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
        let rand = Math.floor(Math.random() * longArray.length);
        const test = longArray[rand];
        if (count_length(test) === 7) {
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


// FIND CENTER LETTER FOR GAME (MOST COMMON)
async function getCenter (list: string[], word: string) {
    try {

        let thisResult: { [key: string]: number } = {};
        const mainArray = word.split('');

        Array.from(new Set(mainArray)).forEach(letter => {
            const { length } = mainArray.filter(l => l === letter);
            thisResult[letter] = length;
        });

        for (let item of list) {
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
        const word = await getRandomWord();
        if (word) {
            const letterArray = word.split('');
            const uniqueArray = letterArray.filter((value, index, array) => array.indexOf(value) === index);
            const anagrams = generateAnagrams(word, mainWordArray);
            const center = await getCenter(anagrams, word);
            if (center) {
                const index = uniqueArray.indexOf(center);
                letterArray.slice(index, 1).push(center);
                const anagrams2 = centerFilter(anagrams, center)
                const anagrams3 = await validWordArray(anagrams2);
                if (anagrams3) {
                    const todaysPangrams = pangrams(anagrams3, letterArray);
                    const anagramObjList = anagrams3.map((word) => {
                        return calculatePoints(word, todaysPangrams)
                    })
                    const now = new Date(Date.now());
                    const today = `${now.getFullYear()}_${now.getMonth()}_${now.getDay()}`
                    return {
                        id: today,
                        centerLetter: center,
                        pangrams: todaysPangrams,
                        letters: uniqueArray,
                        totalPoints: calculateTotal(anagramObjList),
                        validWords: anagramObjList
                    }
                }

            }
        }
        else throw new Error('error in final constructor')
    }
    catch (e) {
        console.log('fetch error in constructor', e)
    }
}



