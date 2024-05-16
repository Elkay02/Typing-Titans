import { SignIn, SignedIn, SignedOut, useClerk } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';

import chatIcon from '../../assets/Chat-1.svg'
import bellIcon from '../../assets/Bell.svg'
import './Navbar.css'

const Navbar = () => {

  const { user } = useClerk();

  return (
    <div className="nav-container">
      <Link to="/"  className='link'><h2 className='main-title'>Typing Titans</h2></Link>

      <Link to='/sign-in'>
        <SignIn path='sign-in' />
      </Link>

      <div className='icon-container'>
        <img src={chatIcon} alt="Chat Bubble Icon" />
        <img src={bellIcon} alt="Bell Icon" />

        <SignedOut>
          <Link to='/sign-in'>
            <button className='sign-button'>Sign in</button>
          </Link>

          <Link to='/sign-up'>
            <button className='sign-button'>Sign up</button>
          </Link>
        </SignedOut>

        <SignedIn>
          <Link to='/profile' className='user-profile-pic' style={{ 'backgroundImage': `url(${ user?.imageUrl })` }}>
            { user?.username?.charAt(0).toUpperCase() }
          </Link>
        </SignedIn>
      </div>
    </div>
  )

}

export default Navbar;
