import './game-component.css';

function GameComponent () {


    return (
        <>

                    <div id='game-container' className='block'>

                        <img id='spiderweb' src='/spiderweb.svg' />

                        <form id="letter-form" >
                            <input type='text' id='text-input'></input>
                            <div className='gameholder'>

                                <button id="pos1" className='hex-button'>1</button>
                                <button id="pos2" className='hex-button'>2</button>
                                <button id="pos3" className='hex-button'>3</button>
                                <button id="pos4" className='hex-button'>4</button>
                                <button id="pos5" className='hex-button'>5</button>
                                <button id="pos6" className='hex-button'>6</button>
                                <button id="pos7" className='hex-button'>7</button>
                            </div>
                        </form>
                    </div>


        </>
    )
}

export default GameComponent
