import { useEffect, useState } from 'react';
import './Shortcut.css';

interface Shortcut {
  name: string;
  windows: string[];
  mac: string[];
}

const Shortcut = () => {
  const [shortcuts, setShortcuts] = useState<Shortcut[]>([
    {
      name: "show properties",
      windows: ["Alt", "Enter"],
      mac: ["Meta", "i"]
    },
    {
      name: "select all",
      windows: ["Control", "a"],
      mac: ["Meta", "a"]
    },
    {
      name: "cut",
      windows: ["Control", "x"],
      mac: ["Meta", "x"]
    },
    {
      name: "delete",
      windows: ["Control", "Delete"],
      mac: ["Meta", "Delete"]
    },
    {
      name: "copy",
      windows: ["Control", "c"],
      mac: ["Meta", "c"]
    },
    {
      name: "paste",
      windows: ["Control", "v"],
      mac: ["Meta", "v"]
    },
    {
      name: "save",
      windows: ["Control", "s"],
      mac: ["Meta", "s"]
    },
    {
      name: "undo",
      windows: ["Control", "z"],
      mac: ["Meta", "z"]
    },
    {
      name: "find",
      windows: ["Control", "f"],
      mac: ["Meta", "f"]
    },
    {
      name: "print",
      windows: ["Control", "p"],
      mac: ["Meta", "p"]
    },
    {
      name: "zoom in",
      windows: ["Control", "+"],
      mac: ["Meta", "+"]
    },
    {
      name: "zoom out",
      windows: ["Control", "-"],
      mac: ["Meta", "-"]
    }
  ]);

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

      const inputLength = input.length + 1; // Including the current key press
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
      }
    }

    return () => clearInterval(timer);
  }, [isRunning, shortcuts]);

  return (
    <div className="shortcut-card-container">
      <h2 className='shortcut-title'>Shortcut Race</h2>
      <h1 className='shortcut-div'>{shortcuts[0]?.name}</h1>

      <div>
        <h3 className='shortcut-time'>Time: {(Math.round(time * 100) / 100).toFixed(1)} s</h3>
        {!hint && <button className='shortcut-button' onClick={() => { if (reveal) setHint(true) }}>{countdown[myIndex]}</button>}
        <h5 className='shortcut-hint'>{hint && `Windows: ${shortcuts[0].windows.join(' + ')} / Mac: ${shortcuts[0].mac.join(' + ')} `}</h5>
      </div>
    </div>
  );
};

export default Shortcut;
