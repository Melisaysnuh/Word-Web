import { WordObj } from "./WordObj";

export interface Daylist {

        daylist_id: string;
        _id?: string;
        isograms: string[];
        centerLetter: string;
        letters: string[];
        validWords: WordObj[];

}