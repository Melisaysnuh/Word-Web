import './word-list-component.css';
import { WordObj } from '../types/WordObj';
import { useEffect, useState } from 'react';
import { GameComponentProps } from '../types/GameComponent';




function WordListComponent ({ guessedWords, totalPoints }: GameComponentProps) {
    const [spiderClass, setSpiderClass] = useState('prog-spider-class-0');

    function calculatePoints (guessedWords: WordObj[]) {
        let myPoints: number = 0;
        guessedWords.forEach((word) => {
            myPoints += word.points;

        });
        return myPoints;
    }


    useEffect(() => {
        const setSpiderClassFunc = (num: number) => {
            const total = totalPoints;
            console.log('total points: ', totalPoints);
            const myPoints = num;
            console.log('your points: ', myPoints);
            const prog = myPoints / total;
            const curvedProg = Math.pow(prog, 2);

            if (curvedProg> .125 && curvedProg< .25) {
                setSpiderClass('prog-spider-class-1');
            }
            else if (curvedProg> .25 && curvedProg< .375) {
                setSpiderClass('prog-spider-class-2')
            }
            else if (curvedProg> .375 && curvedProg< .5) {
                setSpiderClass('prog-spider-class-3')
            }
            else if (curvedProg> .5 && curvedProg< .625) {
                setSpiderClass('prog-spider-class-4')
            }
            else if (curvedProg> .625 && curvedProg< .75) {
                setSpiderClass('prog-spider-class-5')
            }
            else if (curvedProg> .75 && curvedProg< .875) {
                setSpiderClass('prog-spider-class-6')
            }
            else if (curvedProg> .875 && curvedProg< 1) {
                setSpiderClass('prog-spider-class-7')
            }
            else if (curvedProg=== 1) {
                setSpiderClass('prog-spider-class-8')
            }
        }
        setSpiderClassFunc(calculatePoints(guessedWords));
    }, [guessedWords, totalPoints]);



    return (
        <>

            <div id='word-list-container' className='block'>
                <div className='progress-bar-container'>
                    <img id='prog-spider' className={spiderClass} src='./placeholder-spider.svg'></img>
                    <svg id='prog-line' height="450" width="50">
                        <polyline className="dotted-line" points="20,8 20,58 20,108 20,158 20,208 20,258 20, 308 20, 358 20, 408" />
                        <marker id="circle-marker" markerWidth="6" markerHeight="6" refX="3" refY="3">
                            <circle className="foreground" cx="3" cy="3" r="2" />
                        </marker>
                    </svg>

                </div>
                <div id='word-list'>

                    <ul>
                        {guessedWords && guessedWords.length > 0 ? (
                           guessedWords.sort((a,b)=> a.word.localeCompare(b.word)).map((obj: WordObj) => (
                                <li key={obj.word}>{obj.word}</li>
                            ))
                        ) : (
                            <li> </li>
                        )}
                    </ul>

                </div>
            </div>

        </>
    )
}

export default WordListComponent
