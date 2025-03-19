import { useState, useContext } from 'react';
import '../styles/modal.css'
import { AuthContext } from '../context/UserContext';
import { HistoryI } from '../types/User';


interface UserProps {
    setUserModal: (view: boolean) => void;
}

const UserComponent: React.FC<UserProps> = ({ setUserModal }) => {
    const [message, setMessage] = useState("");


    const { user } = useContext(AuthContext);
    const l = (user?.history?.length) ||1 ;
    const m = l-1;
    console.log('m is', m)
    const latestHistory: HistoryI = user?.history.slice(m)[0];
    console.log('latest history', latestHistory)


    const handleClose = () => {
        setUserModal(false)
        setMessage('bye')
    }

    return (
        <>
            <div onClick={handleClose} className="modal-background">
                <p>{user?.firstName}</p>

                <ul>   <li>
                    {latestHistory?.guessedWords && latestHistory.guessedWords.length > 0 ? (
                        latestHistory.guessedWords.map((word, index) => <span key={index}>{word.word}</span>)
                    ) : (
                        <span>No guessed words available</span>
                    )}
                </li>
                    </ul>
                {message && <p className="message">{message}</p>}
            </div>
        </>
    )
}

export default UserComponent
