export function calculatePoints (thisWord: string, pangramsList: string[]) {
    if (thisWord.length < 5) {
        return {
            word: thisWord,
            points: 1,
            pangram: false

        }
    }
    else if (pangramsList.includes(thisWord)) {
        return {
            word: thisWord,
            points: thisWord.length + 7,
            pangram: true

        }
    }
    else {
        return {
            word: thisWord,
            points: thisWord.length,
            pangram: false

        }
    }
}

export function centerFilter (list: string[], letter: string) {
    console.log('in center filter. list is: ', list)
    const finalAnagrams: string[] = list.filter((word: string) => {
        return word.includes(letter)
    });
    console.log('final anagrams are', finalAnagrams)
    return finalAnagrams;

}
export function generateAnagrams (word: string, array: string[]) {
    const regex1 = new RegExp(`^[${word}]+$`);
    const anagrams: string[] = array.filter((word: string) => regex1.test(word));
    return anagrams;

}

export async function getCenter (validWordAnagrams: string[], uniqueArray: string[]) {
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

export function pangrams (wordList: string[], letterList: string[]) {
    const reg1 = `(?=.*`;
    const reg2 = `)`;
    const reg3 = letterList.join('')
    const regconstruct = letterList.map(l => reg1 + l + reg2).join('');
    console.log(wordList);
    console.log(letterList)

    const regex = new RegExp(`^${regconstruct}[${reg3}]+$`)
    const pangrams: string[] = wordList.filter((word: string) => regex.test(word));
    return pangrams;
}
