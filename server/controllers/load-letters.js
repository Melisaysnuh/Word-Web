import { fetchList } from "../modules/fetch-list.js";
export async function loadLetters(req, res) {
    try {
        const list = await fetchList();
        console.log('loadletter controller working!');
        if (list) {
            res.status(200).json(list);
        }
    }
    catch {
        console.error('controller error');
    }
}
