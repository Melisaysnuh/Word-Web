import { Schema } from 'mongoose';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

const url = process.env.DATABASE_URL;
console.log(`url is ${url}`)

export async function connectDB () {
   if (url) {
       try {
           await mongoose.connect(url, {
               dbName: 'wordweb',
           });
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
    isograms: Array,
    totalPoints: Number,
    letters: Array,
    validWords: Array,

});

export const dayModel = mongoose.model('word-web', daySchema);
