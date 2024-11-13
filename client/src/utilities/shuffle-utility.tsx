
export function generateRandomIndices (letters: string[]) {

    const remainingLetters = letters.slice(1);
    const shuffled = [letters[0]]
    while (remainingLetters.length) {
        const randomIndex = Math.floor(Math.random() * remainingLetters.length);
        shuffled.push(remainingLetters.splice(randomIndex, 1)[0]);
    }
    return shuffled;

};