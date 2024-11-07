import './App.css'

function App () {


  return (
    <>
      <div id='main-container'>
        <nav id='navigation'><img src='/logo.svg' alt='logo' /></nav>
        <div id='subhead'>
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
          <div id='word-list-container' className='block'>
            <div id='progress-bar-container'>
              <svg id='spider' height="450" width="50">
                <polyline className="dotted-line" points="20,8 20,58 20,108 20,158 20,208 20,258 20, 308 20, 358 20, 408" />
                <marker id="circle-marker" markerWidth="6" markerHeight="6" refX="3" refY="3">
                  <circle className="foreground" cx="3" cy="3" r="2" />
                </marker>
              </svg>

            </div>
            <div id='word-list'>

              <ul>
                <li>Allay</li>
                <li>Allot</li>
                <li>Allotropy</li>
                <li>Allyl</li>
                <li>Altar</li>
                <li>Aorta</li>
                <li>Aport</li>
                <li>Appall</li>
                <li>Apparat</li>
                <li>Apply</li>
                <li>Appro</li>
                <li>Aptly</li>
                <li>Arroyo</li>
                <li>Aryl</li>
                <li>Atlatl</li>
                <li>Atoll</li>
                <li>Atopy</li>
                <li>Attar</li>
                <li>Lota</li>
                <li>Loyal</li>
                <li>Loyalty</li>
                <li>Lyart</li>
                <li>Olla</li>
                <li>Opal</li>
                <li>Orally</li>
                <li>Orator</li>
                <li>Palatal</li>
                <li>Pallor</li>
                <li>Pally</li>
                <li>Paltry</li>
                <li>Paly</li>
                <li>Papa</li>
                <li>Papal</li>
                <li>Papaya</li>
                <li>Pappy</li>
                <li>Parol</li>
                <li>Parr</li>
                <li>Parry</li>
                <li>Partly</li>
                <li>Patty</li>
                <li>Payola</li>
                <li>Payroll</li>
                <li>Poplar</li>
                <li>Poppa</li>
                <li>Portray</li>
                <li>Portrayal</li>
                <li>Potato</li>
                <li>Prat</li>
                <li>Pray</li>
                <li>Proa</li>
                <li>Prototypal</li>
                <li>Pyrola</li>
                <li>Rapport</li>
                <li>Rapt</li>
                <li>Raptor</li>
                <li>Rattly</li>
                <li>Rattrap</li>
                <li>Ratty</li>
                <li>Rota</li>
                <li>Rotator</li>
                <li>Rotatory</li>
                <li>Royally</li>
                <li>Royalty</li>
                <li>Tall</li>
                <li>Taproot</li>
                <li>Taro</li>
                <li>Tarot</li>
                <li>Tarp</li>
                <li>Tarty</li>
                <li>Tatty</li>
                <li>Tola</li>
                <li>Tolar</li>
                <li>Torta</li>
                <li>Totally</li>
                <li>Tray</li>
                <li>Typal</li>
              </ul>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
