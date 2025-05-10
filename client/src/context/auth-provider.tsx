import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { UserI, HistoryI } from "../types/User";
import {
    getDecodedToken,
    getStoredUser,
    getToken,
    logout,
    refreshUserData,
    storeAuthData,
} from "../services/auth-service";
import { AuthContext } from "./auth-context";

const now = format(new Date(), "yyyy_MM_dd");

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserI | null>(null);
    const [history, setHistory] = useState<HistoryI | null>(null);

    useEffect(() => {
        const init = async () => {
            const token = getDecodedToken();
            if (token) {
                const refreshedUser = await refreshUserData().catch(() => null);
                if (refreshedUser) {
                    setUser(refreshedUser);
                    setTodayHistory(refreshedUser);
                    return;
                }
            }

            // Fall back to localStorage (guest/local mode)
            const localUser = getStoredUser();
            if (localUser) {
                setUser(localUser);
                setTodayHistory(localUser);
            }
        };

        init();
    }, []);

    const setTodayHistory = (baseUser: UserI) => {
        const today = baseUser.history.find((h) => h.daylist_id === now);
        if (today) {
            setHistory(today);
        } else {
            const newHistory: HistoryI = {
                daylist_id: now,
                guessedWords: [],
                totalUserPoints: 0,
                level: "Daddy Long-Legs",
            };
            updateHistory(newHistory, baseUser);
        }
    };

    const updateHistory = (newHistory: HistoryI, baseUser?: UserI) => {
        setUser((prevUser) => {
            const activeUser = baseUser || prevUser;
            if (!activeUser) return null;

            const updatedHistory = activeUser.history
                ? [newHistory, ...activeUser.history.filter((h) => h.daylist_id !== now)]
                : [newHistory];

            const updatedUser = { ...activeUser, history: updatedHistory };

            storeAuthData(getToken() || "", updatedUser); // keep localStorage in sync
            return updatedUser;
        });
        setHistory(newHistory);
    };

    const logoutUser = () => {
        setUser(null);
        setHistory(null);
        logout();
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                history,
                setHistory,
                updateHistory,
                logoutUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
