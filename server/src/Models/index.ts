import { Schema } from 'mongoose';
import mongoose from 'mongoose';
export async function connectDB () {
    try {
        await mongoose.connect('mongodb://localhost:27017/wordweb');
        console.log('successfully connected in model');

        return {
            statusCode: 200,
        };
    } catch (e) {
        console.log('internal server error: ', e)
        return {
            statusCode: 500,
            message: 'internal server error.'

        };
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
