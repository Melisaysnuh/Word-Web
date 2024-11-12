import { WordObj } from "./WordObj";

export interface GameComponentProps {
    guessedWords: WordObj[];
    setGuessedWords: React.Dispatch<React.SetStateAction<WordObj[]>>;
    totalPoints: number;
    setTotalPoints: React.Dispatch<React.SetStateAction<number>>;
    spiderClass: string;
    setSpiderClass: React.Dispatch<React.SetStateAction<string>>;
}