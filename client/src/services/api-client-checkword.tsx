import { GameComponentProps } from "../types/GameComponent";
import { base_URL } from "./api-client-get";
import { WordObj } from "../types/WordObj";


export const checkWord = async (word: string, { guessedWords, setGuessedWords }: GameComponentProps) => {
    const wordObj = { word };
    try {
        const res = await fetch(`${base_URL}/submit`, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(wordObj),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (res.status === 200) {
            const data: WordObj = await res.json();
            const guessedWord: WordObj = data;
            setGuessedWords([...guessedWords, guessedWord]);

        } else if (res.status === 400) {
            return { error: 'Word not found in the dictionary.' };
        }
    }
    catch (e) {
        console.error('error checking word in api client. Error:', e)

    }
}
