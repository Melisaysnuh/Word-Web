import { Schema } from 'mongoose';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const url = process.env.DATABASE_URL;

export async function connectDB () {
   if (url) {
       try {
           await mongoose.connect(url);
           console.log('successfully connected in model');

           return {
               statusCode: 200,
           };
       } catch (e) {
           console.error('internal server error: ', e)
           return {
               statusCode: 500,
               message: 'internal server error.'

           };
       }
   }
   else {
    return {
        statusCod: 500,
        message: 'error retrieving url from .env'
    }
   }
}

const daySchema = new Schema ({
    daylist_id: { type: String, unique: true },
    centerLetter: String,
    pangrams: Array,
    totalPoints: Number,
    letters: Array,
    validWords: Array,
    sessions: Array
});

export const dayModel = mongoose.model('word-web', daySchema);
