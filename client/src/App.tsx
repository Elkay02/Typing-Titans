import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import LandingPage from './pages/LandingPage';
import MultiplayerPage from './pages/MultiplayerPage';
import CompetitionPage from './pages/CompetitionPage';
import TrainingPage from './pages/TrainingPage';




function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path='/multiplayer' element={<MultiplayerPage />} />
          <Route path='/competition' element={<CompetitionPage />} />
          <Route path='/training' element={<TrainingPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
