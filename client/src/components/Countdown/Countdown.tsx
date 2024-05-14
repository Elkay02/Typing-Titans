import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setCountdown, clearCountdown } from '../../redux/countdownSlice';
import socket from '../../socket';

const COUNTDOWN: string[] = ['5', '4', '3', '2', '1', 'Go'];

const Countdown = ({path}: {path: string}) => {

  const { value, scale } = useAppSelector(state => state.countdown);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (value === 'Go') {
      setTimeout(() => navigate(`/competition/${path}`), 1000);
    }
  }, [value, navigate, path]);

  useEffect(() => {
    socket.on('countdown', () => {
      COUNTDOWN.forEach((count, index) => {
        setTimeout(() => {
          dispatch(setCountdown(count));
          setTimeout(() => dispatch(clearCountdown()), 500);
        }, 1000 * index);
      });
    });

    return () => {
      socket.off('countdown');
    };
  }, [dispatch]);

  return (
    <>
      <div style={{ transform: `scale(${scale})`, transition: 'transform 500ms ease-in-out' }}>
        {value}
      </div>
    </>
  );
}

export default Countdown;
