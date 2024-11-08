import { fetchList } from "../modules/fetch-list.js"
import { Request, Response } from 'express';
export async function loadLetters (req: Request, res:Response) {
    console.log('in loadLetters function....')
    try {
        const list = await fetchList();
        console.log('here is list', list);
        res.status(200).json(list)


    }
    catch {
        console.error('controller error')
    }
}