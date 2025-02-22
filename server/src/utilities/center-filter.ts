export function centerFilter (list: string[], letter: string) {

    const finalAnagrams: string[] = list.filter((word: string) => {
        return word.includes(letter)
    });
    return finalAnagrams;

}