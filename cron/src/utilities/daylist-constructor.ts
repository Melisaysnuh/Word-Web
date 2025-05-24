import {Daylist} from '../storeListModel.js'
import { generateAnagrams, getCenter, centerFilter, isograms, calculatePoints } from './utilities.js';
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
                    if (newAnagrams) {
                        const todaysisograms = isograms(newAnagrams, uniqueArray);
                        const anagramObjList = newAnagrams.map((word: string) => {
                            return calculatePoints(word, todaysisograms)
                        });
                        return {
                            daylist_id: now,
                            centerLetter: center,
                            isograms: todaysisograms,
                            letters: uniqueArray,
                            validWords: anagramObjList,

                        }
                    }
                    else {
                        return null;
                    }


                }
                else {
                    return null
                }
            }
            else {
                return null
            }
        }
        else {
            return null
        }
    }

    catch (e) {
        console.error('fetch error in constructor', e);
        return null
    }
}



