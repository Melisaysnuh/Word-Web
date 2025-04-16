import React, { createContext } from 'react';
import { UserI, HistoryI } from '../types/User';



export interface AppContextValue {
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


