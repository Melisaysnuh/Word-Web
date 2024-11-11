import { fetchList } from "./fetch-list.js";
// todo query DB //
export async function checkWord(thisWord) {
    try {
        console.log('in db checkword function...', thisWord);
        const list = await fetchList();
        if (list) {
            const check = list.validWords.find((obj) => obj.word === thisWord);
            if (!check) {
                return {};
            }
            else
                console.log('word found: ', check);
            return check;
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
checkWord('fish');
