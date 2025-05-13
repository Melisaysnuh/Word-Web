import { connectDB } from './index.js';
import finalConstructor from './utilities/daylist-constructor.js';
import { dayModel } from './index.js';

export interface WordObj {
    word: string;
    points: number;
    pangram: boolean;
}

export interface Daylist {
    daylist_id: string;
    _id?: string;
    pangrams: string[];
    centerLetter: string;
    letters: string[];
    validWords: WordObj[];
}

async function storeListModel (): Promise<Daylist | null> {
    try {
        await connectDB();
        const result = await finalConstructor();
        if (result) {
            const createdList = await dayModel.create(result) as unknown as Daylist;
            return createdList;
        } else {
            console.error('Could not get day list from service');
            return null;
        }
    } catch (e) {
        console.error('Error storing day list:', e);
        return null;
    }
}

storeListModel()
    .then(() => process.exit(0))
    .catch(err => {
        console.error('Unhandled error:', err);
        process.exit(1);
    });
