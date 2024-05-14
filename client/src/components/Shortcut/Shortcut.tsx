import { useEffect, useState } from 'react';
import './Shortcut.css';
import socket from '../../socket';
import Overlay from '../Overlay/Overlay';
import { useAppSelector } from '../../redux/hooks';

interface Shortcut {
  name: string;
  windows: string[];
  mac: string[];
}

const Shortcut = () => {

  const fetchedShortcuts = useAppSelector((state) => state.shortcut);

  const [shortcuts, setShortcuts] = useState<Shortcut[]>(fetchedShortcuts);

  const countdown: string[] = ['5', '4', '3', '2', '1', 'Reveal Answer'];


  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [ended, setEnded] = useState(false);
  const [input, setInput] = useState<string[]>([]);
  const [reveal, setReveal] = useState(false);
  const [hint, setHint] = useState(false);
  const [myIndex, setMyIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isRunning && !ended) setIsRunning(true);

      const currentShortcut = shortcuts[0];
      setInput(prevInput => [...prevInput, event.key]);

      const inputLength = input.length + 1;
      const lastKeys = [...input, event.key].slice(inputLength - currentShortcut.windows.length, inputLength);

      const windowsMatch = JSON.stringify(lastKeys) === JSON.stringify(currentShortcut.windows);
      const macMatch = JSON.stringify(lastKeys) === JSON.stringify(currentShortcut.mac);

      if (windowsMatch || macMatch) {
        setShortcuts(prevShortcuts => prevShortcuts.slice(1));
        setInput([]);
        setHint(false)
        setReveal(false)
        setMyIndex(0)
      }

      event.preventDefault();
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [input, isRunning, ended, shortcuts]);


  useEffect(() => {
    let countdownTimer: number | undefined;

    if (isRunning && !reveal) {
      countdownTimer = setInterval(() => {
        setMyIndex(prevIndex => {
          if (prevIndex < countdown.length - 1) {
            return prevIndex + 1;
          } else {
            clearInterval(countdownTimer);
            setReveal(true);
            return prevIndex;
          }
        });
      }, 1000);
    }

    return () => clearInterval(countdownTimer);
  }, [countdown.length, isRunning, reveal]);

  useEffect(() => {
    let timer: number | undefined;

    if (isRunning) {
      timer = setInterval(() => setTime(prevTime => prevTime + 0.01), 10);
      if (shortcuts.length === 0) {
        clearInterval(timer);
        setEnded(true);
        setIsRunning(false);
        socket.emit('end-competition', time);
      }
    }

    return () => clearInterval(timer);
  }, [isRunning, shortcuts, time]);
  
  useEffect(() => {
    socket.on('winner', () => {
    setEnded(true)
  })
  }, []);

  socket.on('start-competition', () => {
    setEnded(false);
  });
  

  return (
    <div className="shortcut-card-container">
      <h2 className='shortcut-title'>Shortcut Race</h2>
      <h1 className='shortcut-div'>{shortcuts[0]?.name}</h1>

      <div>
        <h3 className='shortcut-time'>Time: {(Math.round(time * 100) / 100).toFixed(1)} s</h3>
        {!hint && <button className='shortcut-button' onClick={() => { if (reveal) setHint(true) }}>{countdown[myIndex]}</button>}
        <h5 className='shortcut-hint'>{hint && `Windows: ${shortcuts[0].windows.join(' + ')} / Mac: ${shortcuts[0].mac.join(' + ')} `}</h5>
      </div>
       <Overlay ended={ended} />
    </div>
  );
};

export default Shortcut;
