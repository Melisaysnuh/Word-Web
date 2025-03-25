import { useState, useContext } from 'react';
import '../styles/modal.css'
import { AuthContext } from '../context/UserContext';
import { HistoryI } from '../types/User';

interface UserProps {
    setUserModal: (view: boolean) => void;
}

const UserComponent: React.FC<UserProps> = ({ setUserModal }) => {
    const [message, setMessage] = useState("");

    const { user, guessedWords } = useContext(AuthContext);

    let latestHistory: HistoryI;

    if (user && user.history) {
        console.log(user.history)
        latestHistory = user.history[user.history.length-1];
        localStorage.setItem("history", JSON.stringify(latestHistory));
    } else {
        latestHistory = {
            daylist_id: "",
            guessedWords: [],
            totalUserPoints: 0,
        };
    }

    // Get today's date in a friendly format
    const today = new Date().toLocaleDateString();

    const handleClose = () => {
        setUserModal(false);
        setMessage('bye');
    }

    return (
        <>
            <div onClick={handleClose} className="modal-background">
                <div className="modal-container">
                    {/* Greeting and Today's Date */}
                    <h2 className="modal-title">Hi, {user?.firstName}!</h2>
                    <p className="modal-date">Today: {today}</p>

                    {/* Guessed Words List */}
                    <div className="modal-words">
                        <h3>Your Guessed Words:</h3>
                        <ul>
                            {guessedWords && guessedWords.length > 0 ? (
                                guessedWords.map((word, index) => (
                                    <li key={index}>{word.word}</li>
                                ))
                            ) : (
                                <li>No guessed words available</li>
                            )}
                        </ul>
                    </div>

                    {/* Points and Score */}
                    <div className="modal-points">
                        <p><strong>Total Points:</strong> {latestHistory.totalUserPoints}</p>

                    </div>

                    <button onClick={handleClose} className="modal-close-btn">Close</button>


                    {message && <p className="message">{message}</p>}
                </div>
            </div>
        </>
    );
}

export default UserComponent;
