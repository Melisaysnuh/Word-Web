export function pangrams(wordList, letterList) {
    const reg1 = `(?=.*`;
    const reg2 = `)`;
    const reg3 = letterList.join('');
    const regconstruct = letterList.map(l => reg1 + l + reg2).join('');
    const regex = new RegExp(`^${regconstruct}[${reg3}]+$`);
    const pangrams = wordList.filter((word) => regex.test(word));
    return pangrams;
}
