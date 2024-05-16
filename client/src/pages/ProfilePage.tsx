import { UserProfile } from '@clerk/clerk-react';
// import { SignOutButton } from '@clerk/clerk-react';

import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';
import './Pages.css';

const ProfilePage = () => {
  return (
    <div>
      <Navbar />
      <Sidebar />

      <div className='main-container'>
        <UserProfile />
      </div>

      {/* <div className='sign-out-container'>
        <SignOutButton>
          <button className='sign-out-button'>Sign out</button>
        </SignOutButton>
      </div> */}
    </div>
  );
}

export default ProfilePage;
