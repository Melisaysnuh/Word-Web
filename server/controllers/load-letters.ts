import { Request, Response } from 'express';
import { fetchListModel } from '../Models/ListModel.js';

export async function loadLettersController (req: Request, res:Response) {

    try {
        const list = await fetchListModel();

        if (list) {

            res.status(200).json({
                list,
                session: req.session.id
            });
        } else {
            res.status(404).json({ message: "List not found" });
        }

    }
    catch (error) {
        // Log the actual error
        console.error('Controller error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}