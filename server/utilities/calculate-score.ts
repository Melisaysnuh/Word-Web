export function calculatePoints(thisWord: string, pangramsList:string[]) {
if (thisWord.length < 5) {
    return {
        word: thisWord,
        points: 1

    }
}
else if (pangramsList.includes(thisWord)) {
    return {
        word: thisWord,
        points: thisWord.length + 7

    }
}
else {
    return {
        word: thisWord,
        points: thisWord.length

    }
}
}
