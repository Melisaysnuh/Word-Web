import { centerFilter } from "./center-filter.js";

// FIND CENTER LETTER FOR GAME (LEAST COMMON)
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