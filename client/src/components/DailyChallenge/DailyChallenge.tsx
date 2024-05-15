import Sentence from '../Sentence/Sentence';
import './DailyChallenge.css'


const DailyChallenge = () => {

  return (
    <div className="competition-card-container">
      <h2 className='competition-title'>Daily Challenge</h2>
      <div className='sentence-div'>
        <Sentence mode={'daily'} />
      </div>

    </div>
  )

}

export default DailyChallenge;
