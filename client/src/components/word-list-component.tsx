import WordObj from '../types/WordObj';
import '../styles/word-list-component.css';
import {  useEffect, useState, useMemo } from 'react';
import { calculateTotalPoints } from '../utilities/points-utility';
import { getDailyListService } from '../services/list-service';
import { HistoryI, UserI } from '../types/User';
import gsap from 'gsap';

interface WordListComponentProps {
todayHistory: HistoryI | null;
setUser: React.Dispatch<React.SetStateAction<UserI | null>>;
}
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




const WordListComponent: React.FC<WordListComponentProps> = ({ todayHistory, setUser}) => {
    const [spiderClass, setSpiderClass] = useState(spiderLevels[0].className);
    const [spiderName, setSpiderName] = useState(spiderLevels[0].name);
    const [isHorizontal, setIsHorizontal] = useState(window.innerWidth <= 480);
    const verticalPoints = "20,8 20,58 20,108 20,158 20,208 20,258 20,308 20,358 20,408";
    const dotSpacing = 40; // adjust this value for more or less space between dots
    const horizontalPoints = spiderLevels
        .map((_, i) => `${i * dotSpacing},20`)
        .join(" ");

    const [currentPage, setCurrentPage] = useState(0);
    const [totalPoints, setTotalPoints] = useState(0);
    const [activeWord, setActiveWord] = useState<string | null>(null);

    const handleWordClick = (word: string) => {
        setActiveWord((prev) => (prev === word ? null : word));
    };



    const pageSize = isHorizontal ? 18 : 60;

    const paginatedWords = useMemo(() => {
        if (!todayHistory) return [];
        const start = currentPage * pageSize;
        const end = start + pageSize;
        return todayHistory.guessedWords.slice(start, end).sort((a, b) => a.word.localeCompare(b.word));
    }, [todayHistory, currentPage, pageSize]);

    const totalPages = todayHistory?.guessedWords ? Math.ceil(todayHistory.guessedWords.length / pageSize) : 0;

    const nextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
    };

    const prevPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 0));
    };





    useEffect(() => {
        const handleResize = () => {
            setIsHorizontal(window.innerWidth <= 480);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


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
        return todayHistory?.guessedWords ? calculateTotalPoints(todayHistory.guessedWords) : 0;
    }, [todayHistory?.guessedWords]);

    const updateSpiderClass = (points: number, total: number) => {

        const prog = points / total;
        const spider = spiderLevels.find(({ threshold }) => prog < threshold);
        if (spider) {
            setSpiderClass(spider.className);
            setSpiderName(spider.name);
            if (spiderName === 'Black Widow') {


                    gsap.fromTo(".spiderweb", { opacity: 0 }, { opacity: 1, duration: 1 });

            }
            setUser((prevUser) => {
                if (!prevUser || !prevUser.history) return prevUser;



                return { ...prevUser, level: spider.name };
            });
        }
    };

    useEffect(() => {

        async function callFetchPoints () {
            // Function to fetch the daily list and extract the total possible points
            const points = await fetchPoints();
            setTotalPoints(points);

        }
        callFetchPoints();

    }, []);

    useEffect(() => {
        if (todayHistory?.guessedWords && todayHistory.totalUserPoints) {
            updateSpiderClass(todayHistory.totalUserPoints, totalPoints);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [todayHistory, totalPoints, spiderClass]);

    useEffect(() => {
        setCurrentPage(0);
    }, [todayHistory?.guessedWords, isHorizontal]);




    return (
        <>

            <div className='block' id='word-container'>
                <div className='statusmess'><span className='status'>Status: </span>{spiderName}</div>
                <div id='word-list-container'>
                    <div className='progress-bar-container'>
                        <img alt='progress spider' id='prog-spider' className={spiderClass} src='./placeholder-spider.svg' />
                        <div className="spider-line-wrapper">
                            <svg id='prog-line' height={isHorizontal ? 50 : 450} width={isHorizontal ? '100%' : 50}>
                                <polyline className="dotted-line" points={isHorizontal ? horizontalPoints : verticalPoints} />
                                <marker id="circle-marker" markerWidth={isHorizontal ? 4 : 6} markerHeight={isHorizontal ? 4 : 6} refX={isHorizontal ? 2 : 3} refY={isHorizontal ? 2 : 3}>
                                    <circle className="foreground" cx={isHorizontal ? 2 : 3} cy={isHorizontal ? 2 : 3} r={isHorizontal ? 1 : 2} />
                                </marker>
                            </svg>
                            <span className='pointspan'>{guessedWordPoints} of {totalPoints} points</span>
                        </div>
                    </div>


                    <div id='word-list'>
                        {currentPage !== 0 ? <button className="scroll-btn left" onClick={prevPage} disabled={currentPage === 0}>◀</button> : null}
                        <div className="scroll-container">
                            <ul>
                                {paginatedWords.map((obj: WordObj) => (
                                    <li
                                        className={obj.isogram ? 'isogram' : 'normal'}
                                        key={obj.word}
                                        onClick={() => handleWordClick(obj.word)}
                                    >
                                        <div className="word-container">
                                            {obj.word}
                                            {activeWord === obj.word && obj.definition && (
                                                <div className="mobile-definition">
                                                    {obj.definition}
                                                </div>
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {totalPages > 1 ? <button className="scroll-btn right" onClick={nextPage} disabled={currentPage === totalPages - 1}>▶</button> : null}
                    </div>
                </div>
            </div>

        </>
    )
}

export default WordListComponent
