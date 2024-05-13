import './ProgressBar.css'

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="progress-bar-container" style={{ width: `${progress}%`, backgroundColor: 'var(--main-color)', color: 'var(--main-bg-color)' }}>
      {progress.toFixed(0)}%
    </div>
  );
}

export default ProgressBar;