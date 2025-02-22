import WordObj from '../types/WordObj';
import React, { createContext, useEffect, useState } from 'react';
import { UserI } from '../types/User';
import { getDecodedToken } from '../services/auth-service';

interface AppContextValue {
    user: UserI | null;
    setUser: React.Dispatch<React.SetStateAction<UserI | null>>;
    guessedWords: WordObj[];
    setGuessedWords: React.Dispatch<React.SetStateAction<WordObj[]>>;
    totalUserPoints: number;
    settotalUserPoints: React.Dispatch<React.SetStateAction<number>>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AppContextValue>({
    user: null,
    setUser: () => { },
    guessedWords: [],
    setGuessedWords: () => { },
    totalUserPoints: 0,
    settotalUserPoints: () => 0,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserI | null>(null);
    const [guessedWords, setGuessedWords] = useState<WordObj[]>([]);
    const [totalUserPoints, settotalUserPoints] = useState<number>(0)

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
        totalUserPoints,
        settotalUserPoints,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};


/*   const userHistory: HistoryI[] | undefined = res.history;
  if (userHistory !== undefined) {
      const todayHistory: HistoryI = userHistory.filter(h => h.daylist_id === date)[0];
      if (todayHistory && todayHistory.guessedWords) {
          // todayHistory.guessedWords is likely an array of objects, which may or may not match your WordObj type
          // Adjust as necessary to match your expected structure.
          setGuessedWords(todayHistory.guessedWords);
      }
  } */