import { getArray, validateWord } from "./word-list-mgmt.js";

// Recursive function to select a random word, and check that it has 7 unique letters and is valid. Makes entire service async
export async function getRandomWord () {
    try {
        const longArray = await getArray(7, 7);
        const rand = Math.floor(Math.random() * longArray.length);
        const candidate: string = longArray[rand];
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
