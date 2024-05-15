/* eslint-disable @typescript-eslint/no-explicit-any */
import './DailyOverlay.css';

const DailyOverlay = ({ ended, data, current, retry }: { ended: boolean, data: any, current: any, retry: any }) => {
  console.log('DailyOverlay ~ data:', data);


  const newBest = data.message === 'Nice try!\nBut you already did better:'

  const handleButtonClick = () => {
    retry();
  };

  if (!ended) return <></>;

  return (
    <div id='overlay-background'>
      <div id='overlay-container'>
        <h1>{data.message}</h1>

        <h2>
          <div className='metrics'>
            {data.progress.speed.toFixed(2)} words per minute 🐇 <br />
            {data.progress.accuracy.toFixed(2)}% accuracy <br />
          </div>
        </h2>

        {newBest && <div className='metrics'>
          {current.speed.toFixed(2)} words per minute <br />
          {current.accuracy.toFixed(2)}% accuracy <br />
        </div>}

        <button
          onClick={handleButtonClick}
          className='overlay-button'
        >
          Retry?
        </button>
      </div>
    </div>
  );
}

export default DailyOverlay;
