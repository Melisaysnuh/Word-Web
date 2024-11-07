// *Helper function to count word length
export function count_length(text) {
    const array_from_text = text.split("");
    const result = {};
    Array.from(new Set(array_from_text)).forEach((word) => {
        const { length } = array_from_text.filter(w => w === word);
        result[word] = length;
    });
    return Object.keys(result).length;
}
