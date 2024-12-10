import mongoose, { Schema, Model } from 'mongoose';
import bcrypt from 'bcrypt';
import { UserI } from '../types/User';


const userSchema = new Schema<UserI>({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        validate: {
            validator: (email: string) =>
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
            message: "Invalid email format",
        },
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"],
    },
    firstName: {
        type: String,
        required: [false, "First name is required"],
    }

});


userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        console.error("Error hashing password:", error);
        if (error instanceof Error) {
    next(error);
        }
    }
});



userSchema.methods.comparePassword = async function (
    candidatePassword: string
): Promise<boolean> {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        console.error("Error comparing passwords:", error);
        return false; // Default to false on error
    }
};



const UserModel: Model<UserI> = mongoose.model<UserI>('User', userSchema);
export default UserModel;
