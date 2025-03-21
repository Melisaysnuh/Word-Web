import WordObj from '../types/WordObj';
import '../styles/word-list-component.css';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/UserContext';
import { calculatePoints } from '../utilities/points-utility';
import { getDailyList } from '../services/list-service';

const spiderClasses = [
    { threshold: 0.01, className: 'prog-spider-class-0', name: 'Daddy Long-Legs' },
    { threshold: 0.18, className: 'prog-spider-class-1', name: 'Weaver' },
    { threshold: 0.28, className: 'prog-spider-class-2', name: 'Jumping' },
    { threshold: 0.47, className: 'prog-spider-class-3', name: 'Tarantula' },
    { threshold: 0.56, className: 'prog-spider-class-4', name: 'Trapdoor' },
    { threshold: 0.67, className: 'prog-spider-class-5', name: 'Huntsman' },
    { threshold: 0.8, className: 'prog-spider-class-6', name: 'Funnel-web' },
    { threshold: 0.9, className: 'prog-spider-class-7', name: 'Recluse' },
    { threshold: 1, className: 'prog-spider-class-8', name: 'BLACK WIDOW' },
];

function WordListComponent () {
    const [spiderClass, setSpiderClass] = useState(spiderClasses[0].className);
    const [spiderName, setSpiderName] = useState(spiderClasses[0].name);
    const [totalPoints, setTotalPoints] = useState(0);
    const { guessedWords, totalUserPoints } = useContext(AuthContext);

    const fetchPoints = async () => {
        try {
            const data = await getDailyList();
            const arr = data.list.validWords;
            const points = calculatePoints(arr);
            return points
        } catch (e) {
            console.error('Error in fetchDailyList:', e);
            return 100;
        }
    };

    const updateSpiderClass = (points: number, total: number) => {

        const prog = points / total;
        const spider = spiderClasses.find(({ threshold }) => prog < threshold);
if (spider) {
    setSpiderClass(spider.className);
    setSpiderName(spider.name);
}
    };

    useEffect(() => {

        const getPoints = async () => {
            const points = await fetchPoints();
            setTotalPoints(points);
        };
        getPoints();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if(guessedWords.length > 0) {
            updateSpiderClass(totalUserPoints, totalPoints);

        }


    }, []);



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
