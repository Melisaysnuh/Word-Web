import WordObj from "../types/WordObj";
export function calculatePoints (list: WordObj[]) {
    let myPoints: number = 0;
    list.forEach((word) => {
        if (word.points)
        myPoints += word.points;

    });
    return myPoints;
}
