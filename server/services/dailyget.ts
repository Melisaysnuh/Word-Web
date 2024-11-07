import fs from 'fs';
import { createRequire } from 'module'; // Use to import CommonJS modules
const require = createRequire(import.meta.url); // Creates a require function
const wordListPath = await import('word-list').then(module => module.default);

const wordArray = fs.readFileSync(wordListPath, 'utf8').split('\n').filter((word: string) => word.length >= 4);
let longArray = wordArray.filter((word: string) => word.length >= 7)
function getRandomWord () {


    let rand = Math.floor(Math.random() * longArray.length);


    const test = longArray[rand];
    function count_occurrence (text: string) {
        const array_from_text = text.split("");
        const result: { [key: string]: number } = {};

        Array.from(new Set(array_from_text)).forEach((word: string) => {
            const { length } = array_from_text.filter(w => w === word);
            result[word] = length;
        });
        return Object.keys(result).length;
    }
    if (count_occurrence(test) === 7) {
        return test
    } else { return getRandomWord() };

}
console.log(wordArray.length)
console.log(getRandomWord())
