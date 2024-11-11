import { checkWord } from '../modules/check-word.js';
export async function submitWordController(req, res) {
    console.log('in submitword function....');
    try {
        const wordToCheck = req.body.word.toLowerCase();
        console.log('here is word to check: ', wordToCheck);
        const answer = await checkWord(wordToCheck);
        console.log('answer: ', answer);
        res.status(200).json(answer);
    }
    catch (e) {
        res.status(500).json({ error: 'internal server error in submit word controller' });
        console.error('controller error: ', e);
    }
}
