import { Request, Response } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import UserModel from '../Models/UserModel.js';
import { fetchListModel } from '../Models/ListModel.js';
import { format } from 'date-fns';


const now = format(new Date(), "yyyy_MM_dd");



dotenv.config();
// automatic jwtSecretgenerator
const jwtSecret = process.env.JWT_SECRET || crypto.randomBytes(64).toString('hex');

/* const generateToken = (user: UserI) => {
    return jwt.sign(
        { _id: user._id, email: user.email, firstName: user.firstName },
        jwtSecret,
        { expiresIn: '1d' }
    );
}; */

export const registerController = async (req: Request, res: Response): Promise<void> => {
   try {
       const { email, password, firstName } = req.body;

       if (!email || !password) {
           throw new Error(`Email and password are required`)
       }
       if (password.length < 8 /* || !/[A-Z]/.test(password) || !/[0-9]/.test(password) */) {
           throw new Error(`Password doesn't meet strength requirements`)
       }
       const existingUser = await UserModel.findOne({ email });
       if (existingUser) {
           res.status(400)
           throw new Error('User already exists');
           ;
       };

       const user = new UserModel({ email, password, firstName });
       await user.save();
       const token = jwt.sign(
           {
               _id: user._id,
               email: user.email,
               firstName: user.firstName,
               history: []
           },
           jwtSecret,
           { expiresIn: '48h' }
       );
       console.log(`user ${user.email} registered`)
       res.status(201).json({
           user: user,
           message: `${user.email} was successfully registered`,
           token
       });
   }
    catch (error: any) {
          console.error('Error during registration:', error);

    if (error.message === 'Email and password are required' ||
        error.message === 'Password doesn\'t meet strength requirements' ||
        error.message === 'User already exists') {
        res.status(400).json({ error: error.message });
    } else {
        res.status(500).json({ error: 'Server error during registration' });
    }
}
}

export const loginController = async (req: Request, res: Response): Promise<void | void> => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400);
            throw new Error('Missing email or password')
        }
        const user = await UserModel.findOne({ email });
        if (!user) {
            res.status(401);
            throw new Error('No user found');

        }
        if (!process.env.JWT_SECRET) {
            console.log("No JWT Secret Found!");
            res.status(500).json({ error: 'JWT_SECRET is not defined in environment variables' });
            ;
        }
        else {

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                res.status(401).json({ error: 'Invalid credentials' });
            }

            const token = jwt.sign({ _id: user._id, email: user.email, firstName: user.firstName, history: user.history }, jwtSecret, { expiresIn: '1d' });

            const today = await fetchListModel();
            if (user.history && today) {
                const alreadyHasHistory = user.history.some(item => item.daylist_id === today.daylist_id);
                if (!alreadyHasHistory) {
                    user.history.push({
                        daylist_id: now,
                        guessedWords: [],
                        totalUserPoints: 0,
                        level: 'Daddy Long-Legs'
                    });
                    await user.save();
                }
            }


            res.status(200).json({
                token,
                user: {
                    _id: user._id,
                    email: user.email,
                    firstName: user.firstName,
                    history: user.history

                }
            });
        }
    }
    catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Server error during login' });
    }
}

