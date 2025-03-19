
const currentTime = Date.now();
const CACHE_EXPIRATION_TIME = 60 * 60 * 1000; // Cache expires after 1 hour
const cachedDailyList: number | null = null;
const cacheTimestamp: number = 0;
export const base_URL = 'http://localhost:3000'



export const getDailyList = async () => {

    if (cachedDailyList && currentTime - cacheTimestamp < CACHE_EXPIRATION_TIME) {
        console.log('Returning cached daily list');
        return cachedDailyList; // Return the cached data if still valid
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
                       return list


        }
    }
    catch (e) {
        console.error('error getting your letters in api client', e)

    }
}

