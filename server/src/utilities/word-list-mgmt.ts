import fs from 'fs';

const WORDS = './words.txt';
import dotenv from 'dotenv';
dotenv.config()
console.log('hello');

export const getArray = async (num: number, num2: number) => {
    const mainWordArray = fs.readFileSync(WORDS, 'utf8').split('\n').filter((word: string) => word.length >= num && word.length <= num2);
    return mainWordArray
}

console.log(getArray(1,2));


export const validateWord = async (word: string): Promise<boolean> => {
    try {
        const url = process.env.API_BASE_URL;
        const apiKey = process.env.API_KEY;
        const res = await fetch(`${url}${word}${apiKey}`);
        if (res.ok) {
            const data = await res.json();
            console.log(data);
            if (
                data && typeof data[0] === 'object' &&
                data[0].meta.id === word &&
                data[0].meta.offensive === false &&
            data[0].fl !== 'abbreviation' ) {
                console.log(word + ' is a valid word')
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
export const removeInvalidWord = async (wordToRemove: string): Promise<void> => {
    try {
        console.log(`Removing invalid word: ${wordToRemove}`);

        // Read current words
        const words = fs.readFileSync(WORDS, 'utf8')
            .split('\n')
            .map(word => word.trim()) // Trim spaces to prevent duplicates
            .filter(w => w.toLowerCase() !== wordToRemove.toLowerCase()); // Case-insensitive removal

        // Write updated words back to the file
        fs.writeFileSync(WORDS, words.join('\n'), 'utf8');

        console.log(`Word "${wordToRemove}" removed from words.txt`);
    } catch (error) {
        console.error('Error removing word:', error);
        throw error;
    }
};
