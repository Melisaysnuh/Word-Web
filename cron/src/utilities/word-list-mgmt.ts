import fs from 'fs';
import path from 'path';
const WORDS = path.join(__dirname, '..', 'words.txt');
import dotenv from 'dotenv';
if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

// all functions that interact with word list
export const getArray = async (num: number, num2: number) => {
    const mainWordArray = fs.readFileSync(WORDS, 'utf8').split('\n').filter((word: string) => word.length >= num && word.length <= num2);
    return mainWordArray
}

export const validateWord = async (word: string): Promise<boolean | null> => {
    const url = process.env.WEBSTER_API_URL;
    if (url) {
        const apiKey = process.env.WEBSTER_API_KEY;
        if (apiKey) {
            try {
                const res = await fetch(`${url}${word}?key=${apiKey}`);
                  if (res.ok) {
                    const data = await res.json();

                    if (
                        data && typeof data[0] === 'object' &&
                        data[0].meta.offensive === false &&
                        data[0].fl !== 'abbreviation' &&
                        data[0].fl !== 'Latin phrase' &&
                        data[0].fl !== 'Spanish phrase') {
                        return true;
                    }
                    else {
                        removeInvalidWord(word);
                        return false;
                    }
                }
                else throw new Error(`Response: ${res.status}`);
            }
            catch (e) {
                console.error('error validating word in api', e)
                throw e;
            }


        }
        else {
            console.error('Error fetching api key from .env');
            return null;
        }
    }
    else {
        console.error('Error fetching URL from .env');
        return null;
    }


}
export const removeInvalidWord = async (wordToRemove: string): Promise<void> => {
    try {

        // Read current words
        const words = fs.readFileSync(WORDS, 'utf8')
            .split('\n')
            .map(word => word.trim()) // Trim spaces to prevent duplicates
            .filter(w => w.toLowerCase() !== wordToRemove.toLowerCase()); // Case-insensitive removal

        // Write updated words back to the file
        fs.writeFileSync(WORDS, words.join('\n'), 'utf8');

    } catch (error) {
        console.error('Error removing word:', error);
        throw error;
    }
};


// Recursive function to select a random word, and check that it has 7 unique letters and is valid. Makes entire service async
export async function getRandomWord () {
    try {
        const longArray = await getArray(7, 7);
        const rand = Math.floor(Math.random() * longArray.length);
        const candidate: string = longArray[rand];
        const regex = /^(?!.*(.).*\1)[a-z]+$/;
        if (candidate.length === 7 && regex.test(candidate)) {
            const result: boolean | null = await validateWord(candidate);
            if (result)
                return candidate
        }

        return getRandomWord()
            ;
    }
    catch (e) {
        console.error('error in getRandomWord: ', e)

    }
}

export async function validWordArray (list: string[]) {
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
        console.error('error validating array: ', e);

    }
}

