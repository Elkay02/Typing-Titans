import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import LandingPage from './pages/LandingPage';
import MultiplayerPage from './pages/MultiplayerPage';
import CompetitionPage from './pages/CompetitionPage';
import TrainingPage from './pages/TrainingPage';
import LessonsPage from './pages/LessonsPage';




function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path='/competition' element={<CompetitionPage />} />
          <Route path='/training' element={<TrainingPage />} />
          <Route path="/lessons" element={<LessonsPage />} />
          <Route path='/lobby/:game' element={<MultiplayerPage />} />
          <Route path='/competition/:game' element={<CompetitionPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
