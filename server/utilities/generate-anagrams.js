export function generateAnagrams(word, array) {
    const regex1 = new RegExp(`^[${word}]+$`);
    const anagrams = array.filter((word) => regex1.test(word));
    return anagrams;
}
