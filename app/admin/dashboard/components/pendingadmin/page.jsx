"use client";
import React, { useContext } from "react";
import { InternshipContext } from "@/app/context/internshipcontext";

function PendingAdmin() {
  const {
    pendingAdmin,
    loading,
    acceptedStatus,
    accept,
    reject,
    rejectedStatus,
  } = useContext(InternshipContext);
  console.log(pendingAdmin);
  return (
    <div>
      {pendingAdmin &&
      <div>
         <div className="text-center m-5 p-5 font-semibold text-[1.5rem] font-mono"> Pending Admins</div>
        {pendingAdmin.map((admin) => (
          <div key={admin._id} className= "border-blue-900 p-5 rounded-lg bg-gray-300 my-5">
            <div className="flex justify-center">
              <div className="p-4 bg-gray-200 rounded shadow-md">
                <div className="font-bold text-lg mb-2">Admin Profile</div>
                <div className="my-2 font-semibold">Username: {admin.username}</div>
                <div className="my-2 font-semibold">Email: {admin.email}</div>
              </div>
            </div>
            <div className="flex justify-center space-x-4 my-5">
              <button
                onClick={() => accept(admin._id, admin.role)}
                className="bg-green-500 text-white px-4 py-2 rounded focus:outline-none focus:shadow-outline-blue active:bg-green-600"
              >
                Accept
              </button>
              <button
                onClick={() => reject(admin._id, admin.role)}
                className="bg-green-500 text-white px-4 py-2 rounded focus:outline-none focus:shadow-outline-green active:bg-green-600"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
       
      }
    </div>
  );
}

export default PendingAdmin;
