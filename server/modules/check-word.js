import { fetchListModule } from "./fetch-list.js";
import { CronJob } from "cron";
let cache;
const job = new CronJob('0 0 0 * * *', function clearCache() {
    cache = null;
}, null, false, 'Europe/Berlin');
job.start();
export async function checkWord(thisWord) {
    let list;
    try {
        if (!cache) {
            list = await fetchListModule();
            if (list) {
                cache = list;
            }
        }
        else {
            console.log('returning cache!');
            list = cache;
        }
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
