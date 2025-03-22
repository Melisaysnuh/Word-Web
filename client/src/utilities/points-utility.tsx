import WordObj from "../types/WordObj";
export function calculateTotalPoints (list: WordObj[]) {
    let totalPoints: number = 0;
    list.forEach((word) => {
        if (word.points)
        totalPoints += word.points;

    });
    return totalPoints;
}
