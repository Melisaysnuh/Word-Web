import WordObj from "./WordObj";

export default interface SubmitWordResponse {
    valid: boolean;
    guessedWord?: WordObj;
}