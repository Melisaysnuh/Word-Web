import { base_URL } from "./list-service";
import WordObj from "../types/WordObj";
import SubmitWordResponse from "../types/SubmitWordResponse";
import { getToken } from "./auth-service";

// * to delete or move
/* interface CheckWordProps {
    guessedWords: WordObj[];
    setGuessedWords: React.Dispatch<React.SetStateAction<WordObj[]>>;
}; */





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
            // or, should we take it here in the service and update? or in the context itself?
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
