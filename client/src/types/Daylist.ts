import WordObj from "./WordObj";
export default interface Daylist {

        _id: string;
        pangrams: string[];
        centerLetter: string;
        letters: string[];
        totalPoints: number;
        validWords: WordObj[];

}

