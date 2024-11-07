import fs from 'fs';
import { Daylist } from '../Daylist';
// ABOUT: This is my backend service, that will eventually run  once a day at 8 a.m. to generate the letters and words for the daily game. It uses a word list to get the words, as well as merriam webster's free api to validate that word variants or non-words aren't included. the word list i chose is filtered for profanity, or else that would be included here.

// * step 1, FETCH WORD LISTS
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

// * STEP 2: GET RANDOM WORD
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

// * STEP 3 FETCH ANAGRAMS
function generateAnagrams (word: string) {
    const regex1 = new RegExp(`^[${word}]+$`);
    const anagrams: string[] = mainWordArray.filter((word: string) => regex1.test(word));
    return anagrams;

}

// * STEP 4 FIND CENTER LETTER FOR GAME (MOST COMMON)
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

// * STEP 5 FILTER ALL WORDS THAT DON'T INCLUDE CENTER LETTER
async function centerFilter (list: string[], letter: string) {
    try {
        const finalAnagrams: string[] = list.filter((word: string) => {
            return word.includes(letter)
        });
        return finalAnagrams;
    }
    catch (e) {
        console.log('error in center-letter filter: ', e)
    }

}
// * STEP 6: NOW WITH SMALLER ARRAY, CALL MERRIAM WEBSTER API AGAIN TO VALIDATE THE REST OF THE WORDS.
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
// * CONSTRUCT OUR LIST AND EXPORT
export async function finalConstructor (): Promise<Daylist | undefined > {
    try {
        const word = await getRandomWord();
        if (word) {
            const letterArray = word.split('');
            const anagrams = generateAnagrams(word);
            const center = await getCenter(anagrams, word);
            if (center) {
                const index = letterArray.indexOf(center);
                letterArray.slice(index, 1).push(center);
                const anagrams2 = await centerFilter(anagrams, center)
                if (anagrams2) {
                    const anagrams3 = await validWordArray(anagrams2);
                    if (anagrams3) {
                        return {
                            centerLetter: center,
                            letters: letterArray,
                            validWords: anagrams3,
                        }
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

// *Helper function to count word length

function count_length (text: string) {
    const array_from_text = text.split("");
    const result: { [key: string]: number } = {};
    Array.from(new Set(array_from_text)).forEach((word: string) => {
        const { length } = array_from_text.filter(w => w === word);
        result[word] = length;
    });
    return Object.keys(result).length;
}

