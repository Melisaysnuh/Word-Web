import { fetchListModel } from '../Models/ListModel.js';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import UserModel from '../Models/UserModel.js';
import { HistoryI, UserI } from '../types/User';
import SubmitWordResponse from '../types/SubmitWordResponse.js';
//import { Daylist } from '../types/Daylist.js';
import { dayModel } from '../Models/index.js';
import { format } from 'date-fns';

const now = format(new Date(), "yyyy_MM_dd");



dotenv.config();
// todo fix:
const jwtSecret = process.env.JWT_SECRET || '4sdhglkjdsg459jd';

export async function submitWordController (req: Request, res: Response): Promise<void> {

try {

            const list = await fetchListModel();
            if (list) {
                const { word } = req.body;
                if (!word || typeof word !== 'string') {
                    res.status(400).json({ error: 'Invalid word input' });
                    return;
                }
                const wordToCheck = word.toLowerCase();
                const validatedWord = list.validWords.find(thisword => thisword.word === wordToCheck);

                if (validatedWord) {
                    const toReturn: SubmitWordResponse = {
                        valid: true,
                        guessedWord: validatedWord
                    };
                    res.status(200).json(toReturn
                    );
                }
                else {
                    const toReturn: SubmitWordResponse = {
                        valid: false
                    };
                    res.status(200).json(toReturn
                    );
                }
            } else {
                res.status(500).json({ error: 'error fetching list' })
            }

    } catch (e) {
        console.error('controller error:', e);
        res.status(500).json({ error: 'internal server error in submit word controller' });
        return;
    }
}
export async function submitAuthController (req: Request, res: Response): Promise<void> {
    try {
        const authHeader = req.headers.authorization;

        // Check for the Bearer token in the header
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({ error: 'No token provided' });
            return;
        }

        const token = authHeader.split(' ')[1];
        let decoded: UserI;

        // checking for token
        try {
            decoded = jwt.verify(token, jwtSecret) as UserI;
        } catch (err) {
            res.status(401).json({ error: `Invalid token: ${err}` });
            return;
        }

        const userId = decoded._id;


        const list = await fetchListModel();
        const user = await UserModel.findById(userId);

        if (!user || !list || !(list instanceof dayModel)) {
            res.status(500).json({ error: 'Error fetching list or user from auth submit' });
            return;
        }

        const currentDaylistId = list.daylist_id;
        const { word } = req.body;


        if (!word || typeof word !== 'string') {
            res.status(400).json({ error: 'Invalid word input' });
            return;
        }

        const wordToCheck = word.toLowerCase();
        const validatedWord = list.validWords.find(thisword => thisword.word === wordToCheck);


        if (!validatedWord) {
            res.status(200).json({ valid: false });
            return;
        }


        if (!user.history) {
            user.history = [];
        }


        const dayEntry = user.history.find(entry => entry.daylist_id === currentDaylistId);

        if (!dayEntry) {
            const dayEntry: HistoryI = {
                daylist_id: now,
                guessedWords: [validatedWord],
                totalUserPoints: validatedWord.points,
                level: 'Daddy Long-Legs'
            };
            user.history.push(dayEntry);
            await user.save();
        } else {
            // Update guessed words and points if the word hasn't been guessed before
            const alreadyGuessed = dayEntry.guessedWords.some(w => w.word === validatedWord.word);

            if (!alreadyGuessed) {
                dayEntry.guessedWords.push(validatedWord);
                dayEntry.totalUserPoints += validatedWord.points;
            }
        }

        // Save the updated user object
        await user.save();


        // Return the updated information as part of the response
        res.status(200).json({
            valid: true,
            guessedWord: validatedWord;
        });

    } catch (e) {
        console.error('Controller error:', e);
        res.status(500).json({ error: 'Internal server error in submit word controller' });
    }
}

