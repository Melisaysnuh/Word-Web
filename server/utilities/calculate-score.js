export function calculatePoints(thisWord, pangramsList) {
    if (thisWord.length < 5) {
        return {
            word: thisWord,
            points: 1,
            pangram: false
        };
    }
    else if (pangramsList.includes(thisWord)) {
        return {
            word: thisWord,
            points: thisWord.length + 7,
            pangram: true
        };
    }
    else {
        return {
            word: thisWord,
            points: thisWord.length,
            pangram: false
        };
    }
}
