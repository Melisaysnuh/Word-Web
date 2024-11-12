import { fetchList } from "./fetch-list.js";
// todo query DB //
export async function checkWord(thisWord) {
    try {
        const list = await fetchList();
        if (list) {
            const toCheck = list.validWords;
            const res = toCheck.find((obj) => obj.word == thisWord);
            console.log('result: ', res);
            if (!res) {
                return {};
            }
            else
                console.log('word found: ', res);
            return res;
        }
        else {
            console.log(console.log(`error fetching list!`));
            return false;
        }
    }
    catch (e) {
        console.log('error fetching list from your db: ', e);
    }
}
