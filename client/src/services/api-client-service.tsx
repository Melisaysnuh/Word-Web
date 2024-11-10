export const base_URL = 'http://localhost:3000'

const fetchRequest = async (url: string) => {
    try {
        const res = await fetch(`${base_URL}${url}`)
        if (res) {

            const data = await res.json();
            console.log('here is what you fetched in api client', data)
            return data;

        }

    } catch (err: unknown) {
        console.log(`${err} while fetching /${url}`)
    }
}

export const getDailyList = () => fetchRequest('/')