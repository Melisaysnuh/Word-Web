export function calculatePoints (list: WordObj[]) {
    let myPoints: number = 0;
    list.forEach((word) => {
        myPoints += word.points;

    });
    return myPoints;
}
