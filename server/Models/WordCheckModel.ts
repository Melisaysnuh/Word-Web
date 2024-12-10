import { Daylist } from "../types/Daylist.js";
import { fetchListModel } from "./ListModel.js";
import { WordObj } from "../types/WordObj.js";
import { CronJob } from "cron";

let cache: Daylist | null | undefined;
const job = new CronJob(
    '0 0 0 * * *',
    function clearCache () {
        cache = null;
    },
    null,
    false,
    'Europe/Berlin');
job.start();
export async function checkWord (thisWord: string, ) {
    let list: Daylist | null | undefined;
    try {
        if (!cache) {
            list = await fetchListModel();
            if (list) {
                cache = list;

            }
                  }
        else {
            console.log('returning cache!');
            list = cache;
        }

        if (list) {
            const toCheck: WordObj[] | null = list.validWords;

            const res= toCheck.find((obj) => obj.word == thisWord);
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
