import { checkWord } from '../Models/WordCheckModel.js';
import { Request, Response } from 'express';

export async function submitWordController (req: Request, res: Response) {

    try {

        const wordToCheck = req.body.word.toLowerCase();
         const answer: object | undefined =  await checkWord(wordToCheck);
       if (!answer) {
           res.status(500);
       } else if (answer && Object.keys(answer).length == 0) {
           res.status(400).json({
               message: 'Invalid word',
               error: 'The word does not exist in the valid words list',
           });
       }

         if (answer&& Object.keys(answer).length > 0) {

           res.status(200).json(answer);

       }





    }
    catch (e) {
        res.status(500).json({error: 'internal server error in submit word controller'})
        console.error('controller error: ', e)
    }
}