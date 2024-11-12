import { dayModel } from "./index.js";
import { CronJob } from 'cron';
import moment from "moment";
let cache;
// won't work as expectd in dev
const job = new CronJob('0 0 0 * * *', function clearCache() {
    cache = null;
}, null, false, 'Europe/Berlin');
job.start();
export async function fetchList() {
    const now = moment().format('YYYY_MM_DD');
    try {
        if (!cache) {
            const precache = await dayModel.findOne({
                id: now
            });
            if (precache) {
                cache = precache;
                return cache;
            }
            else {
                console.log('No data found for today:', now);
                return null;
            }
        }
        else {
            console.log('returning cache!');
            return cache;
        }
    }
    catch (e) {
        console.log('error fetching list from your db: ', e);
    }
}
