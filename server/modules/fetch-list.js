import { dayModel } from "./index.js";
export async function fetchList() {
    try {
        const thisList = await dayModel.find();
        console.log('fetch list working: ', thisList);
        return thisList;
    }
    catch (e) {
        console.log('error fetching list from your db: ', e);
    }
}
