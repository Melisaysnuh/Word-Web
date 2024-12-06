import { dayModel } from "./index.js";


export async function storeSessionModule (dayListId: string, sessId: string) {
    try {
        const session = {
            sessionId : sessId
        }
        await dayModel.findOneAndUpdate(
            { id: dayListId },
            { $push: { sessions: session } },
            { new: true }  // Return the updated document
        );
        console.log('stored session', session);



    }
    catch (e) {
        console.log('error storing session', e)
    }
};

