import { WordObj } from "../types/WordObj";
import { GameComponentProps } from "../types/GameComponent";

export const base_URL = 'http://localhost:3000'



export const getDailyList = async () => {
    try {
        const res = await fetch(`${base_URL}/`)
        if (res) {
            const data = await res.json();
                       return data

        }
    }
    catch (e) {
        console.error('error getting your letters in api client', e)

    }
}

export const checkWord = async (word: string, { guessedWords, setGuessedWords }: GameComponentProps) => {
    const wordObj = {word};
    try {
         const res = await fetch(`${base_URL}/submit`, {
            method: 'POST',
            body: JSON.stringify(wordObj),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (res.status === 200) {
            const data: WordObj = await res.json();
            const guessedWord: WordObj  = data;
            setGuessedWords([...guessedWords, guessedWord]);

        } else if (res.status === 400) {
            return { error: 'Word not found in the dictionary.' };
        }
    }
    catch (e) {
        console.error('error checking word in api client. Error:', e)

    }
}
