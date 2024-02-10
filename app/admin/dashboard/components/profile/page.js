'use client'
import React, { useContext } from 'react';
import { AuthContext } from '@/app/context/authcontext';

const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className='flex justify-center items-center h-fit'>
    {user ? (
      user.admin ? (
        <div class="p-4 bg-gray-200 rounded shadow-md">
          <div class="font-bold text-lg mb-2">Admin Profile</div>
          <div class="mb-2">Username: {user.admin.username}</div>
          <div>Email: {user.admin.email}</div>
        </div>
      ) : (
        <div class="text-center">Loading data...</div>
      )
    ) : (
      <div class="text-center">You must be logged in</div>
    )}
  </div>
  
  );
};

export default Profile;
