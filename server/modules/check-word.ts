import { Daylist } from "../types/Daylist.js";
import { fetchList } from "./fetch-list.js";
import { WordObj } from "../types/WordObj.js";


// todo query DB //
export async function checkWord (thisWord: string, ) {

    try {

        const list: Daylist | null | undefined = await fetchList();

        if (list) {
            const toCheck: WordObj[] | null = list.validWords;

            const res= toCheck.find((obj) => obj.word == thisWord);
            console.log('result: ', res)
            if (!res) {
                return {}
            }
            else
                console.log('word found: ', res)
               return res;
        }
        else {
            console.log(console.log(`error fetching list!`))
            return false;
        }
    }
    catch (e) {
        console.log('error fetching list from your db: ', e)
    }
}
