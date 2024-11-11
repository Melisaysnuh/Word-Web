import { WordObj } from "../types/WordObj";

export const base_URL = 'http://localhost:3000'



export const getDailyLetters = async () => {
    try {
        const res = await fetch(`${base_URL}/`)
        if (res) {
            const data = await res.json();

           return data.letters;

        }
    }
    catch (e) {
        console.error('error getting your letters in api client', e)

    }
}

export const checkWord = async (word: string) => {
    const wordObj = {word};
    try {
        console.log('parsed word', wordObj)
        const res = await fetch(`${base_URL}/submit`, {
            method: 'POST',
            body: JSON.stringify(wordObj),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (res.status === 200) {
            const data: WordObj = await res.json();

            return data

        } else if (res.status === 400) {
            return null;
        }
    }
    catch (e) {
        console.error('error checking word in api client. Error:', e)

    }
}
