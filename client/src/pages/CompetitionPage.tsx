
import { ReactElement } from 'react';
import CompetitionCard from '../components/CompetitionCard/CompetitionCard';
import Navbar from '../components/Navbar/Navbar'
import Shortcut from '../components/Shortcut/Shortcut';
import Sidebar from '../components/Sidebar/Sidebar'
import DailyChallenge from '../components/DailyChallenge/DailyChallenge';

interface ComponentMap {
  [key: string]: ReactElement; // Define an index signature for the component map
}

const CompetitionPage = () => {
  const pathname = window.location.pathname;

  const componentMap: ComponentMap = {
    "/competition/typing": <CompetitionCard />,
    "/competition/daily": <DailyChallenge />,
    "/competition/shortcut": <Shortcut />,
  };

  const ComponentToRender = componentMap[pathname];

  return (
    <div>
      <Navbar />
      <Sidebar />
      {ComponentToRender && (
        <div>
          {ComponentToRender}
        </div>
      )}
    </div>
  );
}

export default CompetitionPage;
