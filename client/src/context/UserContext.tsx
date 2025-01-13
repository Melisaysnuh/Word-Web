import WordObj from '../types/WordObj';
import React, { createContext, useEffect, useState } from 'react';
import { UserI } from '../types/User';
import { getDecodedToken } from '../services/auth-service';

interface AppContextValue {
    user: UserI | null;
    setUser: React.Dispatch<React.SetStateAction<UserI | null>>;
    guessedWords: WordObj[];
    setGuessedWords: React.Dispatch<React.SetStateAction<WordObj[]>>;
    totalPoints: number;
    setTotalPoints: React.Dispatch<React.SetStateAction<number>>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AppContextValue>({
    user: null,
    setUser: () => { },
    guessedWords: [],
    setGuessedWords: () => { },
    totalPoints: 0,
    setTotalPoints: () => 0,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserI | null>(null);
    const [guessedWords, setGuessedWords] = useState<WordObj[]>([]);
    const [totalPoints, setTotalPoints] = useState<number>(0)

    useEffect(() => {
        const decoded = getDecodedToken();
        if (decoded) {
            setUser(decoded);
        } else {

            setUser(null);
        }
    }, []);

    const value: AppContextValue = {
        user,
        setUser,
        guessedWords,
        setGuessedWords,
        totalPoints,
        setTotalPoints,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
