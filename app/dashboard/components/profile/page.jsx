"use client";
import React, { useContext } from "react";
import { AuthContext } from "@/app/context/authcontext";
import StudentProfile from "@/app/dashboard/student/StudnetProfile";
import CompanyProfile from "@/app/dashboard/company/CompanyProfile";

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
        <div>You must be logged in</div>
      )}
    </>
  );
};

export default Profile;
