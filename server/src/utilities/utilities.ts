import { WordObj } from "../types/WordObj.js";

export function calculateTotal (list: WordObj[]) {
    let points = 0;
    list.forEach((obj) => {
        points += obj.points
    });
    return points
}

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

    const finalAnagrams: string[] = list.filter((word: string) => {
        return word.includes(letter)
    });
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
}

export function pangrams (wordList: string[], letterList: string[]) {
    const reg1 = `(?=.*`;
    const reg2 = `)`;
    const reg3 = letterList.join('')
    const regconstruct = letterList.map(l => reg1 + l + reg2).join('');

    const regex = new RegExp(`^${regconstruct}[${reg3}]+$`)
    const pangrams: string[] = wordList.filter((word: string) => regex.test(word));
    return pangrams;
}
async function testFunc (list: string[], letter: string) {
    const result = centerFilter(list, letter);

    if (result) {
        console.log('here is the result', result)
    } else console.log('no result')
}

const anagramListMock = [
    'asar', 'asea', 'asset', 'aster', 'ates',
    'attar', 'caas', 'caca', 'cacas', 'caeca',
    'caese', 'carat', 'care', 'carer', 'cares', 'caret',
    'carr', 'carrs', 'cars', 'carse', 'cart', 'carta', 'carte',
    'carts', 'casa', 'casas', 'case', 'cases', 'cast', 'caste',
    'casts', 'cate', 'cater', 'cates', 'cats', 'ceas',
    'cease', 'ceca', 'cees', 'cere', 'ceres', 'cert',
    'certs', 'cess', 'cesse', 'cesta', 'cete', 'cetes', 'crare',
    'crass', 'crate', 'cree', 'crees', 'cress', 'crest',
    'ears', 'earst'
]
testFunc(anagramListMock, 's');