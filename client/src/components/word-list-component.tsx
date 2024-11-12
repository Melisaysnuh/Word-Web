import './word-list-component.css';
import { WordObj } from '../types/WordObj';
import { useEffect, useState } from 'react';
import { GameComponentProps } from '../types/GameComponent';




function WordListComponent ({ guessedWords, totalPoints }: GameComponentProps) {
    const [spiderClass, setSpiderClass] = useState('prog-spider-class-0');
    const [spiderName, setSpiderName] = useState('Daddy Long-Legs');


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

            console.log(prog, prog);

            if (prog> .10 && prog< .20) {
                setSpiderClass('prog-spider-class-1');
                setSpiderName('Weaver');
            }
            else if (prog> .20 && prog< .30) {
                setSpiderClass('prog-spider-class-2');
                setSpiderName('Jumping');
            }
            else if (prog> .30 && prog< .4) {
                setSpiderClass('prog-spider-class-3');
                setSpiderName('Tarantula');
            }
            else if (prog> .5 && prog< .625) {
                setSpiderClass('prog-spider-class-4');
                setSpiderName('Trapdoor');
            }
            else if (prog> .625 && prog< .75) {
                setSpiderClass('prog-spider-class-5');
                setSpiderName('Hunstman');

            }
            else if (prog> .75 && prog< .875) {
                setSpiderClass('prog-spider-class-6');
                setSpiderName('Funnel-web');
            }
            else if (prog> .875 && prog< 1) {
                setSpiderClass('prog-spider-class-7');
                setSpiderName('Recluse');
            }
            else if (prog=== 1) {
                setSpiderClass('prog-spider-class-8');
                setSpiderName('BLACK WIDOW');
            }
        }
        setSpiderClassFunc(calculatePoints(guessedWords));
    }, [guessedWords, totalPoints]);



    return (
        <>

            <div className='block'>
                <div className='statusmess'><span className='status'>Status: </span>{spiderName}</div>
                <div id='word-list-container'>
                <div className='progress-bar-container'>
                    <img id='prog-spider' className={spiderClass} src='./placeholder-spider.svg'></img>
                    <svg id='prog-line' height="450" width="50">
                        <polyline className="dotted-line" points="20,8 20,58 20,108 20,158 20,208 20,258 20, 308 20, 358 20, 408" />
                        <marker id="circle-marker" markerWidth="6" markerHeight="6" refX="3" refY="3">
                            <circle className="foreground" cx="3" cy="3" r="2" />
                        </marker>
                    </svg>
                        <span className='pointspan'>{calculatePoints(guessedWords)} of {totalPoints} points</span>
                </div>

                <div id='word-list'>


                    <ul>
                        {guessedWords && guessedWords.length > 0 ? (
                           guessedWords.sort((a,b)=> a.word.localeCompare(b.word)).map((obj: WordObj) => (
                                <li className={obj.pangram===true ? 'pangram' :'normal'} key={obj.word}>{obj.word}</li>
                            ))
                        ) : (
                            <li> </li>
                        )}
                    </ul>

                </div>
                </div>
            </div>

        </>
    )
}

export default WordListComponent
