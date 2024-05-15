import Sentence from '../Sentence/Sentence';
import './CompetitionCard.css'

import socket from '../../socket';
import { useAppDispatch } from '../../redux/hooks';
import { setSentence } from '../../redux/sentence';

const CompetitionCard = () => {
  const pathname = window.location.pathname.split('/').pop() || "";
  const daily = pathname === 'daily';

  const dispatch = useAppDispatch();

  socket.on('sentence', (sentence: string) => {
    dispatch(setSentence(sentence));
  });

  return (
    <div className="competition-card-container">
      <h2 className='competition-title'>{pathname ? 'Daily Challenge' : 'Typing Race'}</h2>
      <div className='sentence-div'>
        <Sentence daily={daily} />
      </div>

    </div>
  )

}

export default CompetitionCard;
