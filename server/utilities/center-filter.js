export function centerFilter(list, letter) {
    const finalAnagrams = list.filter((word) => {
        return word.includes(letter);
    });
    return finalAnagrams;
}
