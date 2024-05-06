import chatIcon from '../assets/Chat-1.svg'
import bellIcon from '../assets/Bell.svg'
import profilePic from '../assets/profileIcon.svg'

const Navbar = () => {

  return (
    <div className="nav-container">
      <h2>Typing Titans</h2>
      <div className='icon-container'>
        <img src={chatIcon} alt="Chat Bubble Icon" />
        <img src={bellIcon} alt="Bell Icon" />
        <img src={profilePic} alt="Profile Picture Icon" />
      </div>
    </div>
  )

}

export default Navbar;