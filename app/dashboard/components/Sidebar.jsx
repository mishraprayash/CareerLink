"use client"
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBriefcase, faClock } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { AuthContext } from '@/app/context/authcontext';
const Sidebar = () => {
const {user}=useContext(AuthContext)
  return (
    <aside className="bg-gray-200 py-4 px-6">
      <ul className="space-y-4">
        <li>
          <Link href="/dashboard" passHref>
          <p className='flex'>
              <FontAwesomeIcon icon={faHome} style={{ fontSize: '1rem', marginRight: '0.5rem', height:"20px"}}/> Dashboard
            </p>
          </Link>
        </li>
        <li>
          <Link href="/dashboard/components/profile" passHref>
            <p className='flex'>

              <FontAwesomeIcon icon={faBriefcase} style={{ fontSize: '1rem', marginRight: '0.5rem', height:"20px"}} /> Profile
          
            </p>
          </Link>
        </li>
        {user ? (
  user.student ? (
    <div>
      <li>
          <Link href="/dashboard/student/updateprofile" passHref>
          <p className='flex'>
              <FontAwesomeIcon icon={faBriefcase} style={{ fontSize: '1rem', marginRight: '0.5rem', height:"20px"}}/> UpdateProfile
           </p>
          </Link>
        </li>
    <li>
      <Link href="/dashboard/student/application" passHref>
        <p className='flex'>
          <FontAwesomeIcon icon={faBriefcase} style={{ fontSize: '1rem', marginRight: '0.5rem', height: '20px' }}/> Applications
        </p>
      </Link>
    </li>
    </div>
  ) : user.company ? (
    <div>

    <li>
      {/* Add your Link or other content for company here */}
      <Link href="/dashboard/company/internship" passHref>
        <p className='flex'>
          <FontAwesomeIcon icon={faBriefcase} style={{ fontSize: '1rem', marginRight: '0.5rem', height: '20px' }}/> My Internships
        </p>
      </Link>
    </li>
    
    <li>
          <Link href="/dashboard/company/createinternship" passHref>
          <p className='flex'>
              <FontAwesomeIcon icon={faBriefcase} style={{ fontSize: '1rem', marginRight: '0.5rem', height:"20px"}}/> Create Internship
           </p>
          </Link>
        </li>
        
        <li>
          <Link href="/dashboard/company/updateprofile" passHref>
          <p className='flex'>
              <FontAwesomeIcon icon={faBriefcase} style={{ fontSize: '1rem', marginRight: '0.5rem', height:"20px"}}/> UpdateProfile
           </p>
          </Link>
        </li>
    </div>
    
  ):null) : null}

        {/* <li>
          <Link href="/dashboard/components/recentactivities" passHref>
          <p className='flex'>
              <FontAwesomeIcon icon={faClock} style={{ fontSize: '1rem', marginRight: '0.5rem', height:"20px"}}/> Recent Activities
           </p>
          </Link>
        </li> */}
        <li>
          <Link href="/dashboard/components/settings" passHref>
          <p className='flex'>
              <FontAwesomeIcon icon={faBriefcase} style={{ fontSize: '1rem', marginRight: '0.5rem', height:"20px"}}/> Settings
            </p>
          </Link>
        </li>
        {/* Add more links as needed */}
      </ul>
    </aside>
  );
};

export default Sidebar;
