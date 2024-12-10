import fs from 'fs';
const WORDS_FILE = './words.txt';
import dotenv from 'dotenv';
dotenv.config()


export const getArray = async (num: number, num2: number) => {
    const mainWordArray = fs.readFileSync(WORDS_FILE, 'utf8').split('\n').filter((word: string) => word.length >= num && word.length <= num2);
    return mainWordArray
}



export const validateWord = async (word: string): Promise<boolean> => {
    try {
        const url = process.env.API_BASE_URL;
        const apiKey = process.env.API_KEY;
        const res = await fetch(`${url}${word}${apiKey}`);
        if (res.ok) {
            const data = await res.json();
            if (data && typeof data[0] === 'object' && data[0].meta.id === word) {
                console.log(word + ' is a valid word')
                return true;
            }
            else {
                console.log(word, 'is not valid');
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
