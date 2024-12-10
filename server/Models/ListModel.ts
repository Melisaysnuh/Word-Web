import { dayModel } from "./index.js"
import { Daylist } from "../types/Daylist.js";
import { format } from 'date-fns';
const now = format(new Date(), "yyyy_MM_dd");
import { finalConstructor } from '../utilities/daylist-constructor.js';
import { error } from 'console';
import { CronJob } from 'cron';





export async function fetchListModel () {
    try {

        const list: Daylist | null = await dayModel.findOne({
            id: now
        });
        if (list) {

            return list
        }
        else {
            console.log('No data found for today:', now);
            return null;
        }

    }


    catch (e) {
        console.log('error fetching list from your db: ', e)
    }

}

export const job = new CronJob(
    '0 0 0 * * *', // cronTime
    async function storeDayModule () {
        try {
            const result = await finalConstructor();
            if (result) {
                const createdList = await dayModel.create(result);
                console.log('list successfully created.' + createdList);


            }
            else throw new Error('error fetching list from service');
            console.log(error);
        }
        catch (e) {
            console.log('error storing day', e)
        }
    },
    null, // onComplete
    false,
    'Europe/Berlin' // timeZone
);
job.start();

 async function storeListModel () {
    try {
        console.log('in storedaytest');
        const result = await finalConstructor();
        if (result) {
            const createdList = await dayModel.create(result);
            console.log('list successfully stored: ' + createdList)

        }
        else throw new Error('could not get day list from service');
        console.log(error);
    }
    catch (e) {
        console.log('error storing day', e)
    }
};
storeListModel();
