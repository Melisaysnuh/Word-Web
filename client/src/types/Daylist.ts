import WordObj from "./WordObj";
export default interface Daylist {

        _id: string;
        daylist_id: string;
        isograms: string[];
        centerLetter: string;
        letters: string[];
        totalPossiblePoints: number;
        validWords: WordObj[];

}

