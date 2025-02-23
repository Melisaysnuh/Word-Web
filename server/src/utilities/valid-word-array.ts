import { validateWord } from "./word-list-mgmt";

export async function validWordArray (list: string[]) {
    try {
        const validWords = [];
        for (let i = 0; i < list.length; i++) {
            const item = list[i];
            const isValid = await validateWord(item);
            if (isValid) {
                validWords.push(item)
            }
        }
        return validWords;
    }
    catch (e) {
        console.log('error validating array: ', e)

    }
}
