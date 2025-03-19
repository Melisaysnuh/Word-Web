import WordObj from '../types/WordObj';
import React, { createContext, useEffect, useState } from 'react';
import { UserI, HistoryI } from '../types/User';
import { getDecodedToken } from '../services/auth-service';
import { format } from 'date-fns';
const now = format(new Date(), "yyyy_MM_dd");

interface AppContextValue {
    user: UserI | null;
    setUser: React.Dispatch<React.SetStateAction<UserI | null>>;
    guessedWords: WordObj[];
    setGuessedWords: React.Dispatch<React.SetStateAction<WordObj[]>>;
    totalUserPoints: number;
    setTotalUserPoints: React.Dispatch<React.SetStateAction<number>>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AppContextValue>({
    user: null,
    setUser: () => { },
    guessedWords: [],
    setGuessedWords: () => { },
    totalUserPoints: 0,
    setTotalUserPoints: () => 0,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserI | null>(null);
    const [guessedWords, setGuessedWords] = useState<WordObj[]>([]);
    const [totalUserPoints, setTotalUserPoints] = useState<number>(0);




    useEffect(() => {
        const decoded = getDecodedToken();
        if (decoded) {
            setUser(decoded);
        } else {

            setUser(null);
        }
        if (user && user.history) {

            const todayHistory: HistoryI = user.history.filter(h => h.daylist_id === Date.now().toString())[0];
            if (todayHistory && todayHistory.guessedWords) {
                // todayHistory.guessedWords is likely an array of objects, which may or may not match your WordObj type
                // Adjust as necessary to match your expected structure.
                setGuessedWords(todayHistory.guessedWords);
            }

            else {
                const todayHistory: HistoryI = {
                    daylist_id: now,
                    guessedWords: guessedWords,
                    totalUserPoints: totalUserPoints
                }
                const updatedUser = {
                    ...user,
                    history: [...user.history, todayHistory], // Add the new history entry
                };
                setUser(updatedUser);
            }
        }
    }, [setUser, guessedWords, totalUserPoints]);

    const value: AppContextValue = {
        user,
        setUser,
        guessedWords,
        setGuessedWords,
        totalUserPoints,
        setTotalUserPoints,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};


