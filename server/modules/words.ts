import { dayModel } from './index.js';
import { finalConstructor } from '../services/daily-get.js';
import { error } from 'console';

export async function storeDay () {
    try {
        const result = await finalConstructor();
        if (result) {
            const createdList = await dayModel.create(result);
            console.log('list successfully stored like this: ', createdList)

        }
        else throw new Error('could not get day list from service');
        console.log(error);
    }
    catch (e) {
        console.log('error storing day', e)
    }
}
