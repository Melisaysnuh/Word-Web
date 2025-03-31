import React, { createContext, useEffect, useState } from 'react';
import { UserI, HistoryI } from '../types/User';
import { getDecodedToken } from '../services/auth-service';
import { format } from 'date-fns';

const now = format(new Date(), "yyyy_MM_dd");

interface AppContextValue {
    user: UserI | null;
    setUser: React.Dispatch<React.SetStateAction<UserI | null>>;
    history: HistoryI | null;
    setHistory: React.Dispatch<React.SetStateAction<HistoryI | null>>;
}

export const AuthContext = createContext<AppContextValue>({
    user: null,
    setUser: () => { },
    history: null,
    setHistory: () => { },
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserI | null>(getDecodedToken);
    const [history, setHistory] = useState<HistoryI | null>(null);

    useEffect(() => {
        const decoded = getDecodedToken();

        if (decoded) {
            const decodedUser: UserI = decoded;
            console.log(decodedUser)
            setUser(decodedUser);

            const todayHistory = decodedUser.history.find(h => h.daylist_id === now);

            if (todayHistory) {
                console.log('todayHistory', history)

                setHistory(todayHistory);
            } else {
                // Create new history entry if today’s data is missing
                const newHistory: HistoryI = {
                    daylist_id: now,
                    guessedWords: [],
                    totalUserPoints: 0,
                    level: "Daddy Long-Legs"
                };
                setHistory(newHistory);
                updateHistory(newHistory);
            }
        }

    }, []);

    // Update the entire history object
    const updateHistory = (newHistory: HistoryI) => {
        setUser((prevUser) => {
            if (!prevUser) return prevUser;

            const updatedHistory = prevUser.history
                ? [newHistory, ...prevUser.history.filter(entry => entry.daylist_id !== now)]  // Replace today's history if needed
                : [newHistory];

            return { ...prevUser, history: updatedHistory };
        });
    };

    // The context value now includes the whole history object
    const value: AppContextValue = {
        user,
        setUser,
        history,
        setHistory,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
