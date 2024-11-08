import { fetchList } from "../modules/fetch-list.js"
export async function loadLetters (req: Request, res:Response) {
    console.log('in loadLetters function....')
    try {
        const list = await fetchList();
        console.log('here is list', list);
        res.json(list);
        return res;

    }
    catch {
        console.error('controller error')
    }
}