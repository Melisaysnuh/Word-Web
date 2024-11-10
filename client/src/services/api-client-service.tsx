export const base_URL = 'http://localhost:3000'



export const getDailyLetters = async () => {
    try {
        const res = await fetch(`${base_URL}/`)
        if (res) {
            const data = await res.json();

           return data.letters;

        }
    }
    catch (e) {
        console.error('error getting your letters in api client', e)

    }
}

export const checkWord = async (word: string) => {
    const wordObj = `{"word" : "${word}"}`
    try {
        console.log('parsed word', word)
        const res = await fetch(`${base_URL}/submit`, {
            method: 'POST',
            body: wordObj,
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (res) {
            const data = await res.json();
            console.log('result from checkword in api client', data);
            return data

        }
    }
    catch (e) {
        console.error('error checking word in api client. Error:', e)

    }
}
