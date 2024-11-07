import fs from 'fs';



const wordListPath = await import('word-list').then(module => module.default);

// Import array from wordList. This will be our main letterArray
const mainWordArray = fs.readFileSync(wordListPath, 'utf8').split('\n').filter((word: string) => word.length >= 4);

// I also want to make this service quicker, and so i'm filtering all words less than 7 words out to get my "base" word
let longArray = mainWordArray.filter((word: string) => word.length >= 7)

// Recursive function to select a random word, and check that it has 7 unique letters
function getRandomWord () {
    let rand = Math.floor(Math.random() * longArray.length);
    const test = longArray[rand];
    if (count_length(test) === 7) {
        return test
    }
    else { return getRandomWord() };
}

// * Now I have today's word:
const todaysWord = getRandomWord()

// function to get all Anagrams
function generateAnagrams (word: string) {
    const regex1 = new RegExp(`^[${word}]+$`);
    const anagrams: string[] = mainWordArray.filter((word: string) => regex1.test(word));
    return anagrams;

}
// * And now i have a list of anagrams, that is quite long.


const todaysAnagrams = generateAnagrams(todaysWord);


// function to find most common letter for center
function getCenter (list: string[], word: string) {
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
const highestLetter = getCenter(todaysAnagrams, todaysWord);

function centerFilter (list: string[], letter: string) {


    const finalAnagrams: string[] = list.filter((word: string) => {
        return word.includes(letter)
    });
    return finalAnagrams;

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

async function validWordArray (list: string[]) {
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
async function main () {
    const toLog = await validWordArray(todaysAnagrams);
    console.log(toLog);  // Logs the filtered list after validation
}

main();  // Calling the function