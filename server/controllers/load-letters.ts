import { fetchList } from "../modules/fetch-list.js"
import { Request, Response } from 'express';
export async function loadLetters (req: Request, res:Response) {

    try {
        const list = await fetchList();
        console.log('loadletter controller working!')
        res.status(200).json(list)


    }
    catch {
        console.error('controller error')
    }
}