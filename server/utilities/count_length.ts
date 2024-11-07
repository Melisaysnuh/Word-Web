// *Helper function to count word length

export function count_length (text: string) {
    const array_from_text = text.split("");
    const result: { [key: string]: number } = {};
    Array.from(new Set(array_from_text)).forEach((word: string) => {
        const { length } = array_from_text.filter(w => w === word);
        result[word] = length;
    });
    return Object.keys(result).length;
}