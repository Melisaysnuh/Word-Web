import WordObj from "../types/WordObj";
import SubmitWordResponse from "../types/SubmitWordResponse";
import { getToken } from "./auth-service";

// * to delete or move
/* interface CheckWordProps {
    guessedWords: WordObj[];
    setGuessedWords: React.Dispatch<React.SetStateAction<WordObj[]>>;
}; */



const base_URL = import.meta.env.VITE_BACKEND_URL
if (!base_URL) {
    console.error('no url found!')
}

export const checkWord = async (
    wordToCheck: string
): Promise<SubmitWordResponse | undefined> => {
    const token = getToken();
    const wordObj: WordObj = { word: wordToCheck };
    if (token){
    try {
        const res = await fetch(`${base_URL}/submitauth`, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(wordObj),
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
            },
        });


            const data: SubmitWordResponse = await res.json();
            if (data) {
                return data
            } else {
                console.error('no data found')
            }



    } catch (e) {
        console.error('error checking word in api client. Error:', e);
    }} else {
        try {
            const res = await fetch(`${base_URL}/submit`, {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify(wordObj),
                headers: {
                    'Content-Type': 'application/json'
                },
            });


            const data: SubmitWordResponse = await res.json();
            console.log(data)

            if (data) {
                return data
            } else {
                console.error('no data found')
            }



        } catch (e) {
            console.error('error checking word in api client. Error:', e);
        }
    }
};
