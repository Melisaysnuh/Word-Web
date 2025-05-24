import { WordObj } from "./WordObj";

export interface Daylist {

        daylist_id: string;
        _id?: string;
        isograms: string[];
        centerLetter: string;
        total_points?: Number | null;
        letters: string[];
        validWords: WordObj[];

}