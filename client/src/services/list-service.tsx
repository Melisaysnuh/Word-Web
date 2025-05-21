import { format } from "date-fns";
import Daylist from "../types/Daylist";



const base_URL = import.meta.env.VITE_BACKEND_URL
if(!base_URL) {
    console.error('NO URL FOUND')
}

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
    console.log(`In list-service.tsx, now is ${now}`)

    const cachedDailyList = getCachedListFromStorage();
    console.log('trying cached list', cachedDailyList)

    if (cachedDailyList && cachedDailyList.list && cachedDailyList.list.daylist_id === now) {

        return cachedDailyList;
    }
    else {
        try {
            console.log('trying', base_URL)

            const res = await fetch(`${base_URL}/`,
                {
                    method: 'GET',
                    credentials: 'include',
                }
            );
            console.log('res is ', res)

            if (res) {
                const list = await res.json();
                saveCachedListToStorage(list);

                return list


            } else {
                console.error('error getting list.')
                return null;
            }
        }
        catch (e) {
            console.error('error getting your letters in api client', e);
            return null


        }

        return null
    }
}

