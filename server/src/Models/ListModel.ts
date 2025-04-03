import { dayModel } from "./index.js"
import { Daylist } from "../types/Daylist.js";
import { format } from 'date-fns';
const now = format(new Date(), "yyyy_MM_dd");
import finalConstructor from '../utilities/daylist-constructor.js';
import { error } from 'console';






export async function fetchListModel () {
    try {

        const list: Daylist | null = await dayModel.findOne({
            daylist_id: now
        });
        if (list) {
            console.log('returning list from database');
            return list;
        }
        else {
            console.log('no list found in database, creating new list')
            const newList = await storeListModel();
            if (newList) {
                console.log('Returning newly created list');
                return newList;

            }
            else {
                console.error('error returning new list');
                return null;
            }

        }
    }
    catch (e) {
        console.log('error fetching list from your db: ', e)
    }

}


export async function storeListModel () {
    try {
        const result = await finalConstructor();
        if (result) {
            const createdList = await dayModel.create(result);
            console.log('list successfully stored: ' + createdList);
            return createdList;

        }
        else {
            console.error('could not get day list from service');
            return null;
        }
    }
    catch (e) {
        console.error('Error storing day list:', e);
        return null;
    }
};

/* export const job = new CronJob(
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
job.start(); */
