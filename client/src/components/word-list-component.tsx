import WordObj from '../types/WordObj';
import '../styles/word-list-component.css';
import { useContext, useEffect, useState, useMemo } from 'react';
import { AuthContext } from '../context/UserContext';
import { calculateTotalPoints } from '../utilities/points-utility';
import { getDailyListService } from '../services/list-service';
import { format } from 'date-fns';
import { HistoryI } from '../types/User';
//const [selectedDate, setSelectedDate] = useState(new Date());
//const [selectedHistory, setSelectedHistory] = useState<HistoryI>(); // Store the history for the selected date

//const formattedDate = format(selectedDate, "yyyy_MM_dd");
const todayFormatted = format(new Date(), "yyyy_MM_dd");


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
    const [selectedHistory, setSelectedHistory] = useState<HistoryI>(); // Store the history for the selected date

    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (user && user.history) {
            const historyForSelectedDate = user.history.find(
                (h) => h.daylist_id === todayFormatted

            );

            setSelectedHistory(historyForSelectedDate)

        }
    }, [user]);


    const fetchPoints = async () => {

        try {
            const data = await getDailyListService();
            if (data && data.list) {
                //console.log('getDailyListService returning', data)
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
    const memoizedTotalPoints = useMemo(async () => {
        const points = await fetchPoints();
        return points;
    }, []);

    const guessedWordPoints = useMemo(() => {
        if (selectedHistory) { return calculateTotalPoints(selectedHistory.guessedWords); }
    }, [selectedHistory]);

    const updateSpiderClass = (points: number, total: number) => {

        const prog = points / total;
        const spider = spiderClasses.find(({ threshold }) => prog < threshold);
        if (spider) {
            setSpiderClass(spider.className);
            setSpiderName(spider.name);
        }
    };

    useEffect(() => {
        memoizedTotalPoints.then((points) => setTotalPoints(points));
    }, [memoizedTotalPoints]);

    useEffect(() => {
        if (selectedHistory && selectedHistory.guessedWords) {
            console.log(history)
            updateSpiderClass(selectedHistory.totalUserPoints, totalPoints);

        }




    }, [history, totalPoints]);





    return (
        <>

            <div className='block'>
                <div className='statusmess'><span className='status'>Status: </span>{spiderName}</div>
                <div id='word-list-container'>
                    <div className='progress-bar-container'>
                        <img alt='progress spider' id='prog-spider' className={spiderClass} src='./placeholder-spider.svg'></img>
                        <svg id='prog-line' height="450" width="50">
                            <polyline className="dotted-line" points="20,8 20,58 20,108 20,158 20,208 20,258 20, 308 20, 358 20, 408" />
                            <marker id="circle-marker" markerWidth="6" markerHeight="6" refX="3" refY="3">
                                <circle className="foreground" cx="3" cy="3" r="2" />
                            </marker>
                        </svg>
                        <span className='pointspan'>{guessedWordPoints} of {totalPoints} points</span>
                    </div>

                    <div id='word-list'>


                        <ul>
                            {selectedHistory?.guessedWords ? (
                                selectedHistory.guessedWords.sort((a, b) => a.word.localeCompare(b.word)).map((obj: WordObj) => (
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
