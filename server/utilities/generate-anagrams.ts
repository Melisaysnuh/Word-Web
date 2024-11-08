export function generateAnagrams (word: string, array: string[]) {
    const regex1 = new RegExp(`^[${word}]+$`);
    const anagrams: string[] = array.filter((word: string) => regex1.test(word));
    return anagrams;

}