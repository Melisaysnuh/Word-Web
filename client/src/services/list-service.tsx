import { format } from "date-fns";
import Daylist from "../types/Daylist";
import { ListBackUpTemp } from "./list-backup";


const base_URL = 'https://word-web-production.up.railway.app'

const getCachedListFromStorage = () => {
    const cachedData = localStorage.getItem('cachedDailyList');
    if (cachedData) {
        return JSON.parse(cachedData); // Parse JSON string to object
    }
    return null;
};


const saveCachedListToStorage = (data: Daylist) => {
    localStorage.setItem('cachedDailyList', JSON.stringify(data));
};
function removeCachedListFromStorage () {
    localStorage.removeItem('cachedDailyList');
};
removeCachedListFromStorage()


export const getDailyListService = async () => {
    const now = format(new Date(), "yyyy_MM_dd").toString();


    const cachedDailyList = getCachedListFromStorage();


    if (cachedDailyList && cachedDailyList.list && cachedDailyList.list.daylist_id === now) {

        return cachedDailyList;
    }
    else {
        try {

            const res = await fetch(`${base_URL}/`,
                {
                    method: 'GET',
                    credentials: 'include',
                }
            )
            if (res) {
                const list = await res.json();
                saveCachedListToStorage(list);

                return list


            } else {
                return ListBackUpTemp;
            }
        }
        catch (e) {
            console.error('error getting your letters in api client, using backup', e);


        }

        return ListBackUpTemp
    }
}

