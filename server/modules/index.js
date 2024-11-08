import { Schema } from 'mongoose';
import mongoose from 'mongoose';
async function connectDB() {
    try {
        await mongoose.connect('mongodb://localhost:27017/wordweb');
        console.log('successfully connected in model');
        return {
            statusCode: 200,
        };
    }
    catch (e) {
        return {
            statusCode: 500,
        };
    }
}
connectDB();
const daySchema = new Schema({
    id: String,
    centerLetter: String,
    pangrams: Array,
    totalPoints: Number,
    letters: Array,
    validWords: Array
});
export const dayModel = mongoose.model('word-web', daySchema);
