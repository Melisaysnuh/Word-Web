import { fetchListModel } from '../Models/ListModel.js';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import UserModel from '../Models/UserModel.js';
import { HistoryI, UserI } from '../types/User';
import SubmitWordResponse from '../types/SubmitWordResponse.js';
//import { Daylist } from '../types/Daylist.js';
import { dayModel } from '../Models/index.js';



dotenv.config();

const jwtSecret = process.env.JWT_SECRET || '4sdhglkjdsg459jd';

export async function submitWordController (req: Request, res: Response): Promise<void> {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({ error: 'No token provided or invalid format' });
            return;
        }
        const token = authHeader.split(' ')[1];
        let decoded: UserI
        try {
            decoded = jwt.verify(token, jwtSecret) as UserI;
        } catch (err) {
            res.status(401).json({ error: 'Invalid token' + err });
            return;
        }


            const userId = decoded._id;

            const list = await fetchListModel();
            const user = await UserModel.findById(userId);
            console.log('user is', user)
            if (list && list instanceof dayModel) {
                const currentDaylistId = list.id;
                const { word } = req.body;
                if (!word || typeof word !== 'string') {
                    res.status(400).json({ error: 'Invalid word input' });
                    return;
                }
                const wordToCheck = word.toLowerCase();
                const validatedWord = list.validWords.find(thisword => thisword.word === wordToCheck);
                console.log('validated word is ', validatedWord);

                if (user && validatedWord) {
                    const userHistory = user.history || [];
                    let dayEntry = userHistory.find((entry: HistoryI) => entry.daylist_id === currentDaylistId);
                    if (!dayEntry) {
                        dayEntry = {
                            daylist_id: currentDaylistId,
                            guessedWords: [validatedWord],
                            totalUserPoints: validatedWord.points,
                            level: 'Daddy Long-Legs'
                        };
                        if (dayEntry)
                        {user.history?.push(dayEntry)};

                    }
                    if (validatedWord) {
                        console.log('word is valid!')

                        if (dayEntry && validatedWord) {
                            if (!dayEntry.guessedWords.find(word => word === validatedWord)) {
                                dayEntry.guessedWords.push(validatedWord);
                                dayEntry.totalUserPoints += validatedWord.points
                            }

                        }
                        await user.save();
                        const toReturn: SubmitWordResponse = {
                            valid: true,
                            guessedWord: validatedWord,
                            history: dayEntry
                        };
                        res.status(200).json(toReturn
                        );
                    } else {
                        const toReturn: SubmitWordResponse = {
                            valid: false,
                            guessedWord: validatedWord
                        };
                        res.status(200).json(toReturn
                        );
                    }




                    return;

                } else {
                    if (validatedWord) {
                        console.log('word is valid!')

                        const toReturn: SubmitWordResponse = {
                            valid: true,
                            guessedWord: validatedWord
                        };
                        res.status(200).json(toReturn
                        );
                    } else {
                        const toReturn: SubmitWordResponse = {
                            valid: false
                        };
                        res.status(200).json(toReturn
                        );
                    }
                }
            } else {
                res.status(500).json({error: 'error fetching list'})
            }


    } catch (e) {
        console.error('controller error:', e);
        res.status(500).json({ error: 'internal server error in submit word controller' });
        return;
    }
}
