import { dayModel } from "./index.js"
import { Daylist } from "../types/Daylist.js";
import { format } from 'date-fns';
const now = format(new Date(), "yyyy_MM_dd");



export async function fetchListModel () {
    try {
        const list: Daylist | null = await dayModel.findOne({
            daylist_id: now
        });
        if (list) {

            return list;
        }
        else {

            console.warn('No list created for', now, '. Creating new list for today.');
            return null;



        }
    }
    catch (e) {
        console.error('error fetching list from your db: ', e);
        return null
    }

}




