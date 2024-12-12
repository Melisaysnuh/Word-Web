import { WordObj } from "./WordObj";

export interface Daylist {

        id: string;
        pangrams: string[];
        centerLetter: string;
        letters: string[];
        totalPoints: number;
        validWords: WordObj[];

}