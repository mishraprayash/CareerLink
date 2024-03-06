"use client";
import React, { useContext } from "react";
import { AuthContext } from "@/app/context/authcontext";

const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex justify-center items-center my-5 w-full p-5 ">
      {user && user.admin && (
        <div className="p-4 rounded shadow-md shadow-black">
          <div className="font-bold text-lg mb-2 text-center">Admin Profile</div>
          <div className="my-2 font-semibold text-center">Username: {user.admin.username}</div>
          <div className="my-2 font-semibold text-center">Email: {user.admin.email}</div>
        </div>
      )}
    </div>
  );
};

export default Profile;
