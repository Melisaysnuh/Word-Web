import { Request, Response } from 'express';
import { fetchListModel } from '../Models/ListModel.js';

export async function loadLettersController (req: Request, res:Response) {
console.log('in controller')
    try {
        const list = await fetchListModel();
        console.log(list)
        if (list) {

            res.status(200).json({
                list,
            });
        } else {
            res.status(405).json({ message: "List not found" });
        }

    }
    catch (error) {
        // Log the actual error
        console.error('Controller error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}