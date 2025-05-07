import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction, } from "express";
import UserModel from "../Models/UserModel.js";
import dotenv from 'dotenv';
import { UserI } from "../types/User.js";


dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;


export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    const authHeaders = req.headers['authorization'];
    if (authHeaders) {
        if (JWT_SECRET) {
            const parts = authHeaders.split(' ');
            if (parts.length !== 2 || parts[0] !== 'Bearer' || !parts[1]) {
                res.status(401).json({ message: 'Malformed auth header' });
                return;
            }
            const token = parts[1];

            try {
                const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
                const { _id } = decoded;
                const user: UserI | null = await UserModel.findOne({ _id: _id });
                if (user) {
                    req.user = user;
                    next();
                }
                else {
                    res.status(404).json({ message: "User not found" });
                    return;
                }
            } catch (error) {

                if (error instanceof Error) {
                    if (error.name === "TokenExpiredError") {
                        res.status(401).json({ message: "Token has expired" });
                        return;
                    } else if (error.name === "JsonWebTokenError") {
                        res.status(401).json({ message: "Invalid token" });
                        return;
                    }
                }

                else {
                    res.status(500).json({ message: "Internal server error" });
                    return;
                }
            }


        }
        else {
            res.status(500).json({ message: "JWT Secret not found" })
            return;
        }
    }
    else {
        res.status(401).json({message: "Missing Auth"})
        return;
    }


};