import Sentence from '../Sentence/Sentence';
import './CompetitionCard.css'

import socket from '../../socket';
import { useAppDispatch } from '../../redux/hooks';
import { setSentence } from '../../redux/sentence';

const CompetitionCard = () => {

  const dispatch = useAppDispatch();

  socket.on('sentence', (sentence: string) => {
    dispatch(setSentence(sentence));
  });

  return (
    <div className="competition-card-container">
      <h2 className='competition-title'>Typing Race</h2>
      <div className='sentence-div'>
        <Sentence mode={'multiplayer'} />
      </div>

    </div>
  )

}

export default CompetitionCard;
