import { format } from "date-fns";
import Daylist from "../types/Daylist";
import { ListBackUpTemp } from "./list-backup";


export const base_URL = 'http://localhost:3000'

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
/* function removeCachedListFromStorage () {
    localStorage.removeItem('cachedDailyList');
};
removeCachedListFromStorage() */


export const getDailyListService = async () => {
    const now = format(new Date(), "yyyy_MM_dd").toString();
   // console.log('now is...', now)

    const cachedDailyList = getCachedListFromStorage();


    if (cachedDailyList && cachedDailyList.list && cachedDailyList.list.daylist_id === now) {
        //console.log('Returning cached daily list');
        return cachedDailyList;
    }
    else {
        try {
            console.log('fetching list from server instead')
            const res = await fetch(`${base_URL}/`,
                {
                    method: 'GET',
                    credentials: 'include',
                }
            )
            if (res) {
                const list = await res.json();
                saveCachedListToStorage(list);
                //console.log('now cached..', getCachedListFromStorage())

                return list


            } else {
                return ListBackUpTemp;
            }
        }
        catch (e) {
            console.error('error getting your letters in api client, using backup', e);


        }
        console.log('no letters found...')
        return ListBackUpTemp
    }
}

