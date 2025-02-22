import { Schema } from 'mongoose';
import mongoose from 'mongoose';
import { fetchListModel } from './ListModel';
export async function connectDB () {
    try {
        await mongoose.connect('mongodb://localhost:27017/wordweb');
        console.log('successfully connected in model');
        fetchListModel();
        return {
            statusCode: 200,
        };
    } catch (e) {
        console.log('internal server error: ', e)
        return {
            statusCode: 500,

        };
    }
}
connectDB();
const daySchema = new Schema ({
    id: String,
    centerLetter: String,
    pangrams: Array,
    totalPoints: Number,
    letters: Array,
    validWords: Array,
    sessions: Array
});

export const dayModel = mongoose.model('word-web', daySchema);
