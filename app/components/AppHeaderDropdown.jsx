"use client"
import Link from 'next/link';
import Image from 'next/image';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUser, faCog, faLock } from '@fortawesome/free-solid-svg-icons';


const AppHeaderDropdown = ({imgUrl,logoutUser}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative inline-block">
      <div className="p-2 cursor-pointer" onClick={toggleDropdown}>
        
        <Image src={imgUrl}
                  alt="profile"
                  height={30}
                  width={30}
                  className="w-10 h-10 rounded-full" 
                />
      </div>
      {isDropdownOpen && (
        <div className="absolute top-full right-0 bg-white border rounded shadow-md z-10">
          <div className="font-bold px-4 py-2 bg-gray-200">Account</div>
          <a href="#" className="block px-4 py-2 hover:bg-gray-100">
            <FontAwesomeIcon icon={faBell} className="mr-2" />
            Notifications
            <span className="bg-blue-500 text-white px-2 py-1 rounded ml-2">42</span>
          </a>
          {/* Add more dropdown items as needed */}
          <div className="font-bold px-4 py-2 bg-gray-200">Settings</div>
          <Link href='/dashboard/components/profile'className="block px-4 py-2 hover:bg-gray-100">
          <FontAwesomeIcon icon={faUser} className="mr-2" />
            Profile
          </Link>
          {/* <a href="/dashboard/components/profile" className="block px-4 py-2 hover:bg-gray-100">
            <FontAwesomeIcon icon={faUser} className="mr-2" />
            Profile
          </a> */}
          <a href="/dashboard/components/settings" className="block px-4 py-2 hover:bg-gray-100">
            <FontAwesomeIcon icon={faCog} className="mr-2" />
            Settings
          </a>
          <div className="border-t border-gray-300"></div>
          <p onClick={logoutUser}  className="block px-4 py-2 hover:bg-gray-100">
            <FontAwesomeIcon icon={faLock} className="mr-2" />
           
            Log Out
     
          </p>
        </div>
      )}
    </div>
  );
};

AppHeaderDropdown.propTypes = {
  // Add prop types if needed
};

export default AppHeaderDropdown;
