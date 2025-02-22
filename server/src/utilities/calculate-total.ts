import { WordObj } from "../types/WordObj.js";

export function calculateTotal(list: WordObj[]) {
    let points = 0;
    list.forEach((obj) => {
        points += obj.points
    });
    return points
}
