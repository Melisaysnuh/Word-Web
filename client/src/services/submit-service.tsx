import { base_URL } from "./list-service";
import WordObj from "../types/WordObj";
import SubmitWordResponse from "../types/SubmitWordResponse";

// * to delete or move
/* interface CheckWordProps {
    guessedWords: WordObj[];
    setGuessedWords: React.Dispatch<React.SetStateAction<WordObj[]>>;
}; */



const token = localStorage.getItem("token");

export const checkWord = async (
    wordToCheck: string
): Promise<SubmitWordResponse | { error: string } | undefined> => {
    const wordObj: WordObj = { word: wordToCheck };
    try {
        const res = await fetch(`${base_URL}/submit`, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(wordObj),
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
            },
        });


            const data: SubmitWordResponse = await res.json();
            return data;



    } catch (e) {
        console.error('error checking word in api client. Error:', e);
    }
};
