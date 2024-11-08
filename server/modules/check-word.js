import { dayModel } from "./index.js";
// todo query DB //
export async function checkWord(thisWord) {
    try {
        const resWord = await dayModel.findOne({
            validWords: { word: thisWord }
        });
        console.log('found word: ', resWord);
    }
    catch (e) {
        console.log('error fetching list from your db: ', e);
    }
}
checkWord('aeon');