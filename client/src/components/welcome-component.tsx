
import '../styles/user-component.css';


interface WelcomeProps {
    setWelcomeModal: (view: boolean) => void;
}

const WelcomeComponent: React.FC<WelcomeProps> = ({setWelcomeModal}) => {

function  handleClose(){
    setWelcomeModal(false)
}

    return (
        <div className="modal-background">
            <div className="modal-container">
                <div className="welcome-container">
                <h2>Welcome to Word Web!</h2>
               <p>Word Web is a free weekly word game where the goal is to find anagrams for a group of seven letters.</p>

                    <h3>How to play</h3><p>Find English words with at least 4 letters that are anagrams. Each day will have at least 1 pangram, or word with all seven letters. All words in the list must have the center letter.</p>

                    <h3>Scoring</h3><p>Four-letter words are worth one point each, five-or-more-letter words are worth one point per letter. Any pangram is worth its letters + seven bonus points.</p>

                <button onClick={handleClose} className="user-close-btn">Close</button>
                </div>
            </div>
        </div>
    );
};

export default WelcomeComponent;
