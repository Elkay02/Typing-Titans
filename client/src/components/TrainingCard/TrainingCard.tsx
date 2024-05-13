import './TrainingCard.css'
import ProgressBar from '../ProgressBar/ProgressBar'
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { completeLesson } from '../../redux/lessonsSlice';


const TrainingCard = () => {

  const dispatch = useAppDispatch();
  const lessons = useAppSelector(state => state.lessons.lessons);
  const completedLessons = useAppSelector(state => state.lessons.completedLessons);
  const progress = (completedLessons.length / lessons.length) * 100;

  const handleLessonClick = (lesson: string) => {
    if (!completedLessons.includes(lesson)) {
      dispatch(completeLesson(lesson));
    }
  };

  return (
    <div className="training-card-container">
      <h2 className='training-title'>Training</h2>
      <div className='progress-container'>
        <h3 className='progress-title'>Progress:</h3>
        <ProgressBar progress={progress} />
      </div>
      <div className='lessons-container '>
        <h3 className='lessons-title'>Lessons:</h3>
        {lessons.map(lesson => (
          <div key={lesson} onClick={() => handleLessonClick(lesson)}
               className={`lesson ${completedLessons.includes(lesson) ? 'completed' : ''}`}>
            {lesson}
          </div>
        ))}
      </div>
    </div>
  );

}

export default TrainingCard;