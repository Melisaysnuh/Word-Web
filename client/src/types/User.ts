import WordObj from "./WordObj";

export interface LoginDataI {
    email: string;
    password: string;
}

export interface RegisterDataI extends LoginDataI {
    firstName?: string;
}

export interface HistoryI {
    daylist_id: string;
    guessedWords: WordObj[];
    totalUserPoints: number;
    level: string;
}
export interface UserI extends RegisterDataI{
    _id: string;
    history: HistoryI[];
    exp?: number
}

