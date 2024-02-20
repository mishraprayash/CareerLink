'use client'
import React, { useContext } from 'react';
import { AuthContext } from '@/app/context/authcontext';

const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className='flex justify-center items-center h-fit'>
    {user ? (
      user.admin ? (
        <div className="p-4 bg-gray-200 rounded shadow-md">
          <div className="font-bold text-lg mb-2">Admin Profile</div>
          <div className="mb-2">Username: {user.admin.username}</div>
          <div>Email: {user.admin.email}</div>
        </div>
      ) : (
        <div className="text-center">Loading data...</div>
      )
    ) : (
      <div className="text-center">You must be logged in</div>
    )}
  </div>
  
  );
};

export default Profile;
