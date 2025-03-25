import Daylist from "../types/Daylist";

const currentTime = Date.now();
const CACHE_EXPIRATION_TIME = 60 * 90 * 1000;
let cachedDailyList: Daylist | null = null;
let cacheTimestamp: number = 0;
export const base_URL = 'http://localhost:3000'



export const getDailyList = async () => {
    console.log(cachedDailyList)
    if (cachedDailyList && currentTime - cacheTimestamp < CACHE_EXPIRATION_TIME) {
        console.log('Returning cached daily list');
        return cachedDailyList;
    }
    try {
        const res = await fetch(`${base_URL}/`,
            {
                method: 'GET',
                credentials: 'include',
                }
        )
        if (res) {
            const data = await res.json();
            const list = data;
            cachedDailyList = list;
            cacheTimestamp = currentTime;
                       return list


        }
    }
    catch (e) {
        console.error('error getting your letters in api client', e)

    }
}

