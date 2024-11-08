import { CronJob } from 'cron';
/* export async function storeDay () {
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
} */
export const job = new CronJob('* * * * * *', // cronTime
function () {
    console.log('You will see this message every second');
}, // onTick
null, // onComplete
true, // start
'America/Los_Angeles' // timeZone
);
job;
