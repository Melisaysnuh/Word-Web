import { Request, Response } from 'express';
import { storeListModel } from '../Models/ListModel.js';

export async function storeListController (req: Request, res:Response) {

    try {
        const list = await storeListModel();

        if (list) {

            res.status(200).json({
                list,
            });
        } else {
            res.status(500).json({ error: "List not created." });
        }

    }
    catch (error) {
        // Log the actual error
        console.error('Controller error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}