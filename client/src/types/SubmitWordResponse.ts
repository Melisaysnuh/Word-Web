import { HistoryI } from "./User";
import WordObj from "./WordObj";

export default interface SubmitWordResponse {
    valid: boolean;
    guessedWord?: WordObj;
    history?: HistoryI
}