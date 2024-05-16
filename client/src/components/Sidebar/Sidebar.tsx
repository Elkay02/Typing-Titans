import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { toggleSidebar } from '../../redux/sidebarSlice';
import { SignOutButton } from '@clerk/clerk-react';

import keyboard from '../../assets/purpleKeyboard.svg'
import menuIcon from '../../assets/menuIcon.svg'
import friendsIcon from '../../assets/friendsIcon.svg'
import chartIcon from '../../assets/chartIcon.svg'
import settingsIcon from '../../assets/settingsIcon.svg'
import questionIcon from '../../assets/questionIcon.svg'
import exitIcon from '../../assets/exitIcon.svg'
import dotsMenuIcon from '../../assets/dotsMenuIcon.svg'
import './Sidebar.css'


const Sidebar = () => {
  const dispatch = useAppDispatch();
  const expanded = useAppSelector((state) => state.sidebar.expanded);

  return (
    <div className={`side-bar-container ${expanded ? 'expanded' : ''}`}>
      <div className={`main-side-icon-container ${expanded ? 'expanded' : ''}`}>
        <img src={expanded ? dotsMenuIcon : menuIcon} alt="Menu Icon" onClick={() => dispatch(toggleSidebar())}/>
        <div className='main-side-icon-container-expanded'>
          <Link to="/"><img src={keyboard} alt="Keyboard Icon" /></Link>
          {expanded && <Link to="/"><span>MAIN HUB</span></Link> }
        </div>
        <div className='main-side-icon-container-expanded'>
          <img src={friendsIcon} alt="Friends Icon" />
          {expanded && <span>FRIENDS</span>}
        </div>
        <div className='main-side-icon-container-expanded'>
          <img src={chartIcon} alt="Chart Icon" />
          {expanded && <span>STATS</span>}
        </div>
      </div>

      <div className={`bottom-side-icon-container ${expanded ? 'expanded' : ''}`}>
        <div className='main-side-icon-container-expanded'>
          <img src={settingsIcon} alt="Settings Icon" />
          {expanded && <span>SETTINGS</span>}
        </div>
        <div className='main-side-icon-container-expanded'>
          <img src={questionIcon} alt="Question Icon" />
          {expanded && <span>HELP CENTER</span>}
        </div>
        <div className='main-side-icon-container-expanded'>
          <SignOutButton><img src={exitIcon} alt="Exit Icon" /></SignOutButton>
          {expanded && <SignOutButton><span>LOG OUT</span></SignOutButton>}
        </div>
      </div>
    </div>
  )

}

export default Sidebar;
