import './MultiplayerCard.css'
import Player1 from '../../assets/p1.svg';
import Player2 from '../../assets/p2.svg';
import ReadyButton from '../ReadyButton/ReadyButton';

const MultiplayerCard = () => {

  return (
    <div className="multiplayer-card-container">
      <h2 className='multiplayer-title'>Typing Race</h2>
      <div className='player-one-container'>
        <h4 className='player-title one'>Player One</h4>
        <img src={Player1} alt="Player 1 Icon" />
        <input className='player-one-name input' type="text" placeholder='Enter your name...'/>
      </div>
      <div className='player-two-container'>
        <h4 className='player-title two'>Player Two</h4>
        <img src={Player2} alt="Player 2 Icon" />
      </div>
      <ReadyButton />
    </div>
  )

}

export default MultiplayerCard;