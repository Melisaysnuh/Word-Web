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
        if (decoded && decoded !== user) {  // Only update if decoded token is different from the current user
            setUser(decoded);
        }

        if (user && user.history) {
            // Find today's history (filter by `daylist_id` matching today's date)
            const todayHistory: HistoryI | undefined = user.history.find(h => h.daylist_id === Date.now().toString());

            if (todayHistory) {
                if (todayHistory.guessedWords) {
                    setGuessedWords(todayHistory.guessedWords);  // Only set guessedWords if today's history exists
                }
            } else {
                const newHistory: HistoryI = {
                    daylist_id: now,
                    guessedWords: guessedWords,  // Set initial guessedWords
                    totalUserPoints: totalUserPoints
                };

                const updatedUser = {
                    ...user,
                    history: [...user.history, newHistory]
                };


                setUser(updatedUser);
            }
        }
    }, []);


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


