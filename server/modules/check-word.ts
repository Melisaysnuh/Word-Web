import { fetchList } from "./fetch-list.js";


// todo query DB //
export async function checkWord (thisWord: string) {

    try {
        const res = await fetchList();
        if (res) {
            res.validWords.map((obj) => {
                if (obj.word === thisWord) {
                    console.log(`here's your word!`, obj)
                    return obj
                }
            });



        }
        else {
            console.log(console.log(`couldn't find anything!`))
            return false;
        }
    }
    catch (e) {
        console.log('error fetching list from your db: ', e)
    }
}
checkWord('bluebell');