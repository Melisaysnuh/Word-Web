// DONE: converted to python
export function calculatePoints (thisWord: string, isogramsList: string[]) {
    if (thisWord.length < 5) {
        return {
            word: thisWord,
            points: 1,
            isogram: false

        }
    }
    else if (isogramsList.includes(thisWord)) {
        return {
            word: thisWord,
            points: thisWord.length + 7,
            isogram: true

        }
    }
    else {
        return {
            word: thisWord,
            points: thisWord.length,
            isogram: false

        }
    }
}
// DONE: converted to python
export function centerFilter (list: string[], letter: string): string[] {
    const finalAnagrams: string[] = [];
    list.forEach((word: string) => {
        if (word.includes(letter)) {
            finalAnagrams.push(word)
        }
    });
    return finalAnagrams;

}

// DONE: converted to python
export function generateAnagrams (word: string, array: string[]) {
    const regex1 = new RegExp(`^[${word}]+$`);
    const anagrams: string[] = array.filter((word: string) => regex1.test(word));
    return anagrams;

}
// DONE: converted to python
export function getCenter (validWordAnagrams: string[], uniqueArray: string[]) {
    let center = '';
    for (let i = 0; i < uniqueArray.length; i++) {
        center = uniqueArray[i];
        const anagramsFilteredByCenter = centerFilter(validWordAnagrams, center);
        if (anagramsFilteredByCenter.length > 20 || anagramsFilteredByCenter.length < 50) {

            return center;
        }
    }
    return center;
}

export function isograms (wordList: string[], letterList: string[]) {
    const reg1 = `(?=.*`;
    const reg2 = `)`;
    const reg3 = letterList.join('')
    const regconstruct = letterList.map(l => reg1 + l + reg2).join('');


    const regex = new RegExp(`^${regconstruct}[${reg3}]+$`)
    const isograms: string[] = wordList.filter((word: string) => regex.test(word));
    return isograms;
}
