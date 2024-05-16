import './MultiplayerCard.css'
import Player1 from '../../assets/p1.svg';
import Player2 from '../../assets/p2.svg';
import ReadyButton from '../ReadyButton/ReadyButton';
import Countdown from '../Countdown/Countdown';
import UserNameForm from '../UserNameForm/UserNameForm';
import Chat from '../Chat/Chat';

import socket from '../../socket';
import { useAppDispatch } from '../../redux/hooks';
import { setSentence } from '../../redux/sentenceSlice';
import { setShortcut } from '../../redux/shortcutSlice';
import { setMovie } from '../../redux/movieSlice';

interface Shortcut {
  name: string;
  windows: string[];
  mac: string[];
}

interface Movie {
  title: string;
  image: string;
}

const MultiplayerCard = () => {
  const pathname = window.location.pathname.split('/').pop() || "";

  const title = pathname.charAt(0).toUpperCase() + pathname.slice(1)
  const dispatch = useAppDispatch();

  if (pathname === "typing") {
    socket.on('sentence', (sentence: string) => {
      dispatch(setSentence(sentence));
    });
  }
  if (pathname === "shortcut") {
    socket.on('shortcuts', (shortcut: Shortcut[]) => {
      dispatch(setShortcut(shortcut));
    });
  }
  if (pathname === "movie") {
    socket.on('movies', (movies: Movie[]) => {
      dispatch(setMovie(movies));
    });
  }

  return (
    <div className="multiplayer-card-container">
      <h2 className='multiplayer-title'>{title} Race</h2>
      <div className='player-one-container'>
        <h4 className='player-title one'>Player One</h4>
        <img src={Player1} alt="Player 1 Icon" />
        <UserNameForm />
      </div>
      <div className='player-two-container'>
        <h4 className='player-title two'>Player Two</h4>
        <img src={Player2} alt="Player 2 Icon" />
      </div>
      <ReadyButton />
      <div className='countdown-container'>
        <Countdown path={pathname} />
      </div>
      <div className='chat-container'>
        <Chat />
      </div>
    </div>
  )

}

export default MultiplayerCard;
