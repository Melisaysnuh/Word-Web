import { dayModel } from './index.js';
import { finalConstructor } from '../utilities/daylist-constructor.js';
import { error } from 'console';
import { CronJob } from 'cron';



export const job = new CronJob(
    '0 0 0 * * *', // cronTime
    async function storeDay () {
        try {
            const result = await finalConstructor();
            if (result) {
                const createdList = await dayModel.create(result);
                console.log('list successfully stored like this: ', createdList)

            }
            else throw new Error('could not get day list from service');
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

async function storeDayTest () {
    try {
        const result = await finalConstructor();
        if (result) {
            const createdList = await dayModel.create(result);
            console.log('list successfully stored like this: ', createdList)

        }
        else throw new Error('could not get day list from service');
        console.log(error);
    }
    catch (e) {
        console.log('error storing day', e)
    }
}
