import { useEffect, useState } from 'react';
import './Movie.css';
import socket from '../../socket';
import Overlay from '../Overlay/Overlay';
import { useAppSelector } from '../../redux/hooks';
import { similarity } from '../../utils/search.js';

interface Movie {
  title: string;
  image: string;
}

const Movie = () => {
  const fetchedMovie = useAppSelector((state) => state.movie);

  const [movies, setMovies] = useState<Movie[]>(fetchedMovie);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [ended, setEnded] = useState(false);
  const [input, setInput] = useState('');
  const [reveal, setReveal] = useState(false);
  const [hint, setHint] = useState(false);
  const [myIndex, setMyIndex] = useState(0);

  const countdown: string[] = ['5', '4', '3', '2', '1', 'Reveal Answer'];

  const playAgain = () => {
    setMovies(fetchedMovie);
    resetGame();
  };

  const resetGame = () => {
    setTime(0);
    setIsRunning(false);
    setEnded(false);
    setInput('');
    setReveal(false);
    setHint(false);
    setMyIndex(0);
  };

  const handleChange = () => {
    if (!isRunning && !ended) setIsRunning(true);
    const sim = similarity(input.toLowerCase(), movies[0].title.toLowerCase());
    if (sim > 0.89) {
      setMovies((prevMovies) => prevMovies.slice(1));
      setInput('');
      setHint(false);
      setReveal(false);
      setMyIndex(0);
    }
  };

  useEffect(() => {
    handleChange();
  }, [input, isRunning, ended, movies]);

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
      timer = setInterval(() => setTime((prevTime) => prevTime + 0.01), 10);
      if (movies.length === 0) {
        console.log('useEffect ~ movies:', movies);
        clearInterval(timer);
        setEnded(true);
        setIsRunning(false);
        socket.emit('end-competition', time);
      }
    }

    return () => clearInterval(timer);
  }, [isRunning, movies, time]);

  useEffect(() => {
    const handleWinner = () => setEnded(true);
    socket.on('winner', handleWinner);

    return () => {
      socket.off('winner', handleWinner);
    };
  }, []);

  useEffect(() => {
    const handleStartCompetition = () => {
      setEnded(false);
      playAgain();
    };
    socket.on('start-competition', handleStartCompetition);

    return () => {
      socket.off('start-competition', handleStartCompetition);
    };
  }, [fetchedMovie]);

  return (
    <div className="shortcut-card-container">
      <h2 className='shortcut-title'>Movie Race</h2>
      <img src={movies[0]?.image} alt="Movie Img" className='shortcut-div' />
      <div>
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} autoFocus />
        <h3 className='shortcut-time'>Time: {(Math.round(time * 100) / 100).toFixed(1)} s</h3>
        {!hint && <button className='shortcut-button' onClick={() => { if (reveal) setHint(true) }}>{countdown[myIndex]}</button>}
        <h5 className='shortcut-hint'>{hint && `${movies[0]?.title}`}</h5>
      </div>
      <Overlay ended={ended} />
    </div>
  );
};

export default Movie;
