'use client'
import React, { useContext } from 'react';
import { AuthContext } from '@/app/context/authcontext';
import StudentProfile from '../../student/StudnetProfile';
import CompanyProfile from '../../company/CompanyProfile';

const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      {user ? (
        user?.student ? (
          <StudentProfile />
        ) : user?.company ? (
          <CompanyProfile />
        ) : (
          <div>Loading data...</div>
        )
      ) : (
        <div className="text-center p-5 m-3 font-semibold h-[90vh]">Loading...</div>
      )}
    </>
  );
};

export default Profile;
