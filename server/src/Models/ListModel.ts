import { dayModel } from "./index.js"
import { Daylist } from "../types/Daylist.js";
import { format } from 'date-fns';
const now = format(new Date(), "yyyy_MM_dd");
import finalConstructor from '../utilities/daylist-constructor.js';




let isCreating = false;
let creationPromise: Promise<Daylist | null> | null = null;


export async function fetchListModel () {

    try {
        const list: Daylist | null = await dayModel.findOne({
            daylist_id: now
        });
        if (list) {

            return list;
        }
        else {

            console.error('No list created for today.');
            return null;



        }
    }
    catch (e) {
        console.error('error fetching list from your db: ', e);
        return null
    }

}


export async function storeListModel (): Promise<Daylist | null> {
    if (isCreating && creationPromise) {
        return creationPromise;
    }

    try {
        isCreating = true;

        creationPromise = (async () => {
            const result = await finalConstructor();
            if (result) {
                const createdList = await dayModel.create(result) as unknown as Daylist;
                return createdList;
            } else {
                console.error('Could not get day list from service');
                return null;
            }
        })();

        const finalResult = await creationPromise;
        return finalResult;
    } catch (e) {
        console.error('Error storing day list:', e);
        return null;
    } finally {
        isCreating = false;
        creationPromise = null;
    }
}

