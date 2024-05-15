/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect, useRef } from 'react'

import './Sentence.css'
import CharBox from '../CharBox/CharBox';
import socket from '../../socket';
import Overlay from '../Overlay/Overlay';
import { useAppSelector } from '../../redux/hooks';
import { fetchDailySentence } from '../../services';

const calculateAccuracy = (totalLetters: number, mistakes: number) => {
  return totalLetters > 0 ? (100 - ((mistakes / totalLetters) * 100)) : 100;
}

const Sentence = ({ mode }: { mode: string }) => {

  const daily = mode === 'daily';


  const [sentence, setSentence] = useState('');
  const [letters, setLetters] = useState(sentence.split(''));
  const [myIndex, setMyIndex] = useState(0);
  const [time, setTime] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [wrongInput, setWrongInput] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [ended, setEnded] = useState(false);

  useEffect(() => {
    if (daily) {
      fetchDailySentence().then(data => {
        setSentence(data);
        setLetters(data.split(''));
      });
    } else {
      const selectedSentence = useAppSelector((state) => state.sentence.sentence);
      setSentence(selectedSentence);
      setLetters(selectedSentence.split(''));
    }
  }, [mode, daily]);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToPosition = (positionX: number) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = positionX;
    }
  };

  // Select a random sentence and reset the states
  const playAgain = async () => {

    if (!daily) {
      // Retrieve the current sentence from state if not 'daily'
      const selectedSentence = useAppSelector((state) => state.sentence.sentence);
      setSentence(selectedSentence);
      setLetters(selectedSentence.split(''));
    }
    setMyIndex(0);
    setTime(0);
    setSpeed(0);
    setMistakes(0);
    scrollToPosition(0)
    setWrongInput(false);
    setIsRunning(false);
    setEnded(false);

  };

  // Monitor key events
  useEffect(() => {
    const detectKeyDown = (e: KeyboardEvent) => {
      if (!isRunning && !ended) setIsRunning(true);

      if (e.key === letters[myIndex]) {
        setWrongInput(false);
        setMyIndex((prevIndex) => prevIndex + 1);
        scrollToPosition(50 * myIndex)
      } else if (e.key !== 'Shift') {
        setMistakes((prevMistakes) => prevMistakes + 1);
        setWrongInput(true);
      }
    };

    document.addEventListener('keydown', detectKeyDown, true);

    return () => {
      document.removeEventListener('keydown', detectKeyDown, true);
    };
  }, [ended, isRunning, letters, myIndex]);

  // Update timer and calculate speed/accuracy
  useEffect(() => {
    let timer: number | undefined;
    const totalLetters = letters.length;
    const wordsTyped = totalLetters / 5;
    const typingSpeed = 60 * (wordsTyped / time);

    if (isRunning && myIndex < totalLetters) {
      setSpeed(typingSpeed);

      timer = setInterval(() => setTime((prevTime) => prevTime + 0.01), 10);
    } else if (myIndex === totalLetters && isRunning) {
      clearInterval(timer);
      const accuracy = calculateAccuracy(totalLetters, mistakes);
      setSpeed(typingSpeed);
      if (daily) setEnded(true);

      if (!daily) socket.emit('end-competition', time, typingSpeed, accuracy);
      setIsRunning(false);
    }

    if (!daily) socket.on('winner', () => {
      setEnded(true)
    })

    return () => clearInterval(timer);
  }, [isRunning, time, letters.length, myIndex, mistakes, daily]);

  if (!daily) socket.on('start-competition', () => {
    setEnded(false);
    playAgain();
  });

  const totalLetters = letters.length;
  const accuracy = calculateAccuracy(totalLetters, mistakes);

  return (
    <div>
      <div className='sentence-box' ref={scrollContainerRef}>
        <div className='sentence-container'>
          {letters.map((char: string, index: number) => (
            <CharBox key={index} char={char} typed={index < myIndex} current={index === myIndex} mistake={wrongInput && index === myIndex} />
          ))}
        </div>
      </div>
      <h3 className='stats'>Time: {(Math.round(time * 100) / 100).toFixed(1)} s</h3>
      <h3 className='stats'>Speed: {(Math.round(speed * 100) / 100).toFixed(0)} words/min</h3>
      <h3 className='stats'>Accuracy: {(Math.round(accuracy * 100) / 100).toFixed(1)} %</h3>
      {!daily && <Overlay ended={ended} />}
      {daily && <button onClick={playAgain}>Retry</button>}
    </div>
  )
}

export default Sentence
