export const base_URL = 'http://localhost:3000'

const fetchRequest = (url) => {
    return fetch(`${base_URL}${url}`)
    .then(res => res.status <= 400 ? res: Promise.reject(res))
    .then(res => res.json())
    .catch((err) => {
        console.log(`${err.message} while fetching /${url}`)
    })
}

export const getDailyList = () => fetch('/')