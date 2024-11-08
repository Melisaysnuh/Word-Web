import { checkWord } from '../modules/check-word.js';
export async function submitWord(req, res) {
    console.log('in submitword function....');
    try {
        const wordToCheck = req.body.json();
        console.log('here is word to check: ', wordToCheck);
        const answer = checkWord(wordToCheck);
        console.log('here is the answer: ', answer);
        res.status(200).json(answer);
    }
    catch {
        console.error('controller error');
    }
}
