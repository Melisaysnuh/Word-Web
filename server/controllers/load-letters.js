import { fetchList } from "../modules/fetch-list.js";
export async function loadLetters(req, res) {
    try {
        const list = await fetchList();
        console.log('loadletter controller working!');
        console.log(list);
    }
    catch {
        console.error('controller error');
    }
}
