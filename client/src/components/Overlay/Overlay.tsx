import { useState, useEffect } from 'react';
import './Overlay.css';
import socket from '../../socket';
import Countdown from '../Countdown/Countdown';

const Overlay = ({ended}: {ended: boolean}) => {

  const pathname = window.location.pathname.split('/').pop() || "";

  const [overlay, setOverlay] = useState('');
  const [time, setTime] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [playAgain, setPlayAgain] = useState(false);
  const [countdown, setCountdown] = useState(false);

  useEffect(() => {
    socket.on('winner', (winner: string, time: number, speed: number, accuracy: number) => {
      setOverlay(winner);
      setTime(time);
      if (pathname === 'typing') {
        setSpeed(speed);
        setAccuracy(accuracy);
      }
    });

    socket.on('start-competition', () => {
      setPlayAgain(false);
    });

    socket.on('countdown', () => {
      setCountdown(true);
    });

    return () => {
      socket.off('winner');
      socket.off('start-competition');
      socket.off('countdown');
    };
  }, [ pathname ]);

  const handleButtonClick = () => {
    const toggleReady = !playAgain;
    socket.emit('isReady', toggleReady);
    setPlayAgain(toggleReady);
  };

  if (!ended) return <></>;

  return (
    <div id='overlay-background'>
      <div id='overlay-container'>
        <h1>{overlay}</h1>

        <h2>
          <div className='metrics'>
            {time.toFixed(2)} s <br />
            {pathname === 'typing' &&
              <>
                {speed.toFixed(2)} words per minute 🐇 <br />
                {accuracy.toFixed(2)}% accuracy <br />
              </>}
          </div>
        </h2>

        <div className='overlay-countdown'>
          <Countdown path={pathname} />
        </div>

        <button
          onClick={handleButtonClick}
          className={`overlay-button ${playAgain && 'ready'} ${countdown && 'hidden'}`}
        >
          {playAgain ? 'Waiting for Opponent' : 'Play Again?'}
        </button>
      </div>
    </div>
  );
}

export default Overlay;
