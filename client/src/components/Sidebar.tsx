import keyboard from '../assets/keyboard.svg'
import menuIcon from '../assets/menuIcon.svg'
import friendsIcon from '../assets/friendsIcon.svg'
import chartIcon from '../assets/chartIcon.svg'
import settingsIcon from '../assets/settingsIcon.svg'
import questionIcon from '../assets/questionIcon.svg'
import exitIcon from '../assets/exitIcon.svg'


const Sidebar = () => {

  return (
    <div className="side-bar-container">
      <div className='main-side-icon-container'>
        <img src={menuIcon} alt="Menu Icon" />
        <img src={keyboard} alt="Keyboard Icon" />
        <img src={friendsIcon} alt="Friends Icon" />
        <img src={chartIcon} alt="Chart Icon" />
      </div>
      <div className="bottom-side-icon-container">
        <img src={settingsIcon} alt="Settings Icon" />
        <img src={questionIcon} alt="Question Icon" />
        <img src={exitIcon} alt="Exit Icon" />
      </div>
    </div>
  )

}

export default Sidebar;