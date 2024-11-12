import { dayModel } from "./index.js";
import { format } from 'date-fns';
const now = format(new Date(), "yyyy_MM_dd");
export async function fetchListModule() {
    try {
        const list = await dayModel.findOne({
            id: now
        });
        if (list) {
            return list;
        }
        else {
            console.log('No data found for today:', now);
            return null;
        }
    }
    catch (e) {
        console.log('error fetching list from your db: ', e);
    }
}
