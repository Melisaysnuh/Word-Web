import { dayModel } from "./index.js"
import { Daylist } from "../types/Daylist.js";
import { format } from 'date-fns';




export async function fetchListModel () {
    const now = format(new Date(), "yyyy_II");
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




