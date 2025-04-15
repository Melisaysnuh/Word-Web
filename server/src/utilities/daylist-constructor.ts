import { Daylist } from '../types/Daylist.js';
import { generateAnagrams, getCenter, centerFilter, pangrams, calculatePoints } from './utilities.js';
import { getArray, getRandomWord, validWordArray } from './word-list-mgmt.js';
import { format } from 'date-fns';
const now = format(new Date(), "yyyy_MM_dd");


// *CONSTRUCT OUR LIST AND EXPORT
export default async function finalConstructor (): Promise<Daylist | null> {
    try {
        const mainWordArray = await getArray(4, 12)
        const word = await getRandomWord();
        if (word) {
            const letterArray = word.split('');
            const uniqueArray = letterArray.filter((value, index, array) => array.indexOf(value) === index);
            const anagrams = generateAnagrams(word, mainWordArray);
            const validWordAnagrams = await validWordArray(anagrams);
            if (validWordAnagrams) {
                const center = await getCenter(validWordAnagrams, uniqueArray);
                if (center && validWordAnagrams) {

                    const newAnagrams = centerFilter(validWordAnagrams, center);
                    console.log('filteredAnagramsbyCenter', newAnagrams);
                    if (newAnagrams) {
                        const todaysPangrams = pangrams(newAnagrams, uniqueArray);
                        console.log('todays pangrams', todaysPangrams);
                        const anagramObjList = newAnagrams.map((word: string) => {
                            return calculatePoints(word, todaysPangrams)
                        });
                        return {
                            daylist_id: now,
                            centerLetter: center,
                            pangrams: todaysPangrams,
                            letters: uniqueArray,
                            validWords: anagramObjList,

                        }
                    }
                    else {
                        console.log('no filtered anagram by center');
                        return null;
                    }


                }
                else {
                    console.log('no valid center');
                    return null
                }
            }
            else {
                console.log('no valid word anagram');
                return null
            }
        }
        else {
            console.log('No word found');
            return null
        }
    }

    catch (e) {
        console.log('fetch error in constructor', e);
        return null
    }
}



