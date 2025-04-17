import { useState, useEffect } from "react";
import { getDecodedToken } from "../services/auth-service";
import { UserI, HistoryI } from "../types/User";
import { AppContextValue, AuthContext } from "./auth-context";
import { format } from 'date-fns';

const now = format(new Date(), "yyyy_MM_dd");

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserI | null>(null);
    const [history, setHistory] = useState<HistoryI | null>(null);

    useEffect(() => {
        const decoded = getDecodedToken();

        if (decoded) {
            const decodedUser: UserI = decoded;
            console.log('in auth provider. decoded user is: ', decodedUser)
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

        // eslint-disable-next-line react-hooks/exhaustive-deps
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