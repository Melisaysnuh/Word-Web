import WordObj from '../types/WordObj';
import '../styles/word-list-component.css';
import { useContext, useEffect, useState, useMemo } from 'react';
import { AuthContext } from '../context/auth-context';
import { calculateTotalPoints } from '../utilities/points-utility';
import { getDailyListService } from '../services/list-service';
import { format } from 'date-fns';
import { HistoryI } from '../types/User';
//import { HistoryI } from '../types/User';
//const [selectedDate, setSelectedDate] = useState(new Date());
//const [history, setSelectedHistory] = useState<HistoryI>(); // Store the history for the selected date
const now = format(new Date(), "yyyy_MM_dd");

const spiderLevels = [
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
    const [spiderClass, setSpiderClass] = useState(spiderLevels[0].className);
    const [spiderName, setSpiderName] = useState(spiderLevels[0].name);
    const [totalPoints, setTotalPoints] = useState(0);

    const { user, history, setHistory } = useContext(AuthContext);
    const [isHorizontal, setIsHorizontal] = useState(window.innerWidth <= 480);
    const verticalPoints = "20,8 20,58 20,108 20,158 20,208 20,258 20,308 20,358 20,408";
const horizontalPoints = "8,20 58,20 108,20 158,20 208,20 258,20 308,20 358,20 408,20";

    useEffect(() => {
        const handleResize = () => {
            setIsHorizontal(window.innerWidth <= 480);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    useEffect(() => {
        if (user?.history) {
            const thisHistory = user.history.find(h=>h.daylist_id===now)
            if(thisHistory) {
                setHistory(thisHistory);
            }
        }
    }, [user]);


    const fetchPoints = async () => {

        try {
            const data = await getDailyListService();
            if (data && data.list) {
                const arr = data.list.validWords;
                const points = calculateTotalPoints(arr);
                return points
            }
            else {
                const arr = data.validWords;
                const points = calculateTotalPoints(arr);
                return points
            }
        } catch (e) {
            console.error('Error in fetchDailyList:', e);
            return 100;
        }
    };

    const guessedWordPoints = useMemo(() => {
        return history?.guessedWords ? calculateTotalPoints(history.guessedWords) : 0;
    }, [history]);

    const updateSpiderClass = (points: number, total: number) => {

        const prog = points / total;
        const spider = spiderLevels.find(({ threshold }) => prog < threshold);
        if (spider) {
            setSpiderClass(spider.className);
            setSpiderName(spider.name);
        }
    };

    useEffect(() => {
        fetchPoints().then(setTotalPoints);
    }, []);

    useEffect(() => {
        console.log('hello')
        if (history && history.totalUserPoints) {
            updateSpiderClass(history.totalUserPoints, totalPoints);

        }




    }, [history, totalPoints]);





    return (
        <>

            <div className='block' id='word-container'>
                <div className='statusmess'><span className='status'>Status: </span>{spiderName}</div>
                <div id='word-list-container'>
                    <div className='progress-bar-container'>
                        <img alt='progress spider' id='prog-spider' className={spiderClass} src='./placeholder-spider.svg'></img>
                        <svg id='prog-line' height={isHorizontal? 50 : 450} width={isHorizontal ? 300 : 50}>
                            <polyline className="dotted-line" points={isHorizontal?horizontalPoints : verticalPoints} />
                            <marker id="circle-marker" markerWidth="6" markerHeight="6" refX="3" refY="3">
                                <circle className="foreground" cx="3" cy="3" r="2" />
                            </marker>
                        </svg>
                        <span className='pointspan'>{guessedWordPoints} of {totalPoints} points</span>
                    </div>

                    <div id='word-list'>


                        <ul>
                            {history?.guessedWords ? (
                                history.guessedWords.sort((a, b) => a.word.localeCompare(b.word)).map((obj: WordObj) => (
                                    <li className={obj.pangram === true ? 'pangram' : 'normal'} key={obj.word}>{obj.word}</li>
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
