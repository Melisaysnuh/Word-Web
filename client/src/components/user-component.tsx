import { useState, useEffect } from 'react';
import '../styles/user-component.css';
import { format, subDays, addDays } from 'date-fns';
import WordObj from '../types/WordObj';
import { HistoryI, UserI } from '../types/User';

interface UserProps {
    setUserModal: (view: boolean) => void;
    user: UserI | null;
}

const UserComponent: React.FC<UserProps> = ({ setUserModal, user }) => {

    const [message, setMessage] = useState("");
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedHistory, setSelectedHistory] = useState<HistoryI>(); // Store the history for the selected date

    const formattedDate = format(selectedDate, "yyyy_MM_dd");
    const todayFormatted = format(new Date(), "yyyy_MM_dd");

    useEffect(() => {
        if (user && user.history) {
            const historyForSelectedDate = user.history.find(
                (h) => h.daylist_id === formattedDate
            );
            setSelectedHistory(historyForSelectedDate); // Store the selected day's history
        }
    }, [selectedDate, formattedDate, user]); // Dependencies: update when selectedDate, user, or formattedDate changes

    const handleClose = () => {
        setUserModal(false);
        setMessage('bye');
    };

    const handlePrevDay = () => {
        setSelectedDate(prevDate => subDays(prevDate, 1));
    };

    const handleNextDay = () => {
        if (formattedDate !== todayFormatted) {
            setSelectedDate(prevDate => addDays(prevDate, 1));
        }
    };

    return (
        <div className="user-background">
            <div className="user-container">
                <h2 className="user-title">Hello, {user?.firstName}!</h2>
                <p className="user-date">Date: {format(selectedDate, "EEEE, MMMM d, yyyy")}</p>

                <div className="nav-buttons">
                    <button onClick={handlePrevDay}>&larr; Previous</button>
                    <button onClick={handleNextDay} disabled={formattedDate === todayFormatted}>
                        Next &rarr;
                    </button>
                </div>

                <div className="user-words">
                    <h3>Guessed Words:</h3>
                    <ul>
                        {selectedHistory && selectedHistory.guessedWords.length > 0 ? (
                            selectedHistory.guessedWords.map((word: WordObj, index: number) => (
                                <li key={index}>{word.word}</li>
                            ))
                        ) : (
                            <li>No guessed words available for this day</li>
                        )}
                    </ul>
                </div>

                <div className="user-points">
                    <p><strong>Total Points:</strong> {selectedHistory ? selectedHistory.totalUserPoints : 0}</p>
                </div>

                <button onClick={handleClose} className="user-close-btn">Close</button>
                {message && <p className="message">{message}</p>}
            </div>
        </div>
    );
};

export default UserComponent;
