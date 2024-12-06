import { fetchListModule } from "../Models/fetch-list.js"
import { Request, Response } from 'express';
import { storeSessionModule } from "../Models/session.js";


export async function loadLettersController (req: Request, res:Response) {

    try {
        const list = await fetchListModule();

        if (list) {

            /* if (!req.session.id) {

                req.session.id = randomUUID();
                await storeSessionModule(list.id, req.session.id)
            } */
            console.log('Session ID:', req.session.id);
            list.sessions.forEach((obj) => {
                console.log('Session in DB:', obj.sessionId);
                console.log('Should Match:', req.session.id);
            });

                const existingSession = list.sessions.find((obj) => obj.sessionId === req.session.id);

                if (existingSession) {
                    console.log('you have an existing session: ', existingSession)
                    res.status(200).json({
                        list,
                        session: existingSession
                    });

                } else {
                    console.log('Session not found in the database, creating a new session.');
                    await storeSessionModule(list.id, req.session.id);
                }


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