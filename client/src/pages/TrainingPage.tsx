import Navbar from '../components/Navbar/Navbar'
import Sidebar from '../components/Sidebar/Sidebar'
import TrainingCard from '../components/TrainingCard/TrainingCard';


const TrainingPage = () => {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <div>
        <TrainingCard />
      </div>
    </div>
  );
}

export default TrainingPage;