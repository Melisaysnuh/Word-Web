import { dayModel } from "./index.js";
import { mockData } from "../utilities/dev.js";
/* let cache: object | null = null; */
let cache = mockData;
// won't work as expectd in dev
export async function fetchList() {
    const now = new Date(Date.now());
    const today = `${now.getFullYear()}_${now.getMonth()}_${now.getDay()}`;
    try {
        if (!cache) {
            const precache = await dayModel.findOne({
                id: today
            });
            if (precache) {
                return precache;
                /*   cache = precache;
                  console.log('You have cached:  ', cache);
                  return cache; */
            }
            else {
                console.log('No data found for today:', today);
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
