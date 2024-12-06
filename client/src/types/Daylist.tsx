import WordObj from "./WordObj";
export default interface Daylist {

        id: string;
        pangrams: string[];
        centerLetter: string;
        letters: string[];
        totalPoints: number;
        validWords: WordObj[];
        sessions: {
                sessionId: string;
        }[]

}