import { fetchList } from "./fetch-list.js";
// todo query DB //
export async function checkWord(thisWord) {
    try {
        const res = await fetchList();
        if (res) {
            const response = res.validWords.find((obj) => obj.word === thisWord);
            if (response)
                console.log('response: ', response);
            return response;
        }
        else {
            console.log(console.log(`couldn't find anything!`));
            return false;
        }
    }
    catch (e) {
        console.log('error fetching list from your db: ', e);
    }
}
