

export const base_URL = 'http://localhost:3000'



export const getDailyList = async () => {
    try {
        const res = await fetch(`${base_URL}/`,
            {
                method: 'GET',
                credentials: 'include',
                }
        )
        if (res) {
            const data = await res.json();
            const {list, session} = data;
                       return {list, session}

        }
    }
    catch (e) {
        console.error('error getting your letters in api client', e)

    }
}

