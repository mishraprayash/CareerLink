"use client"
import React, { useState, useEffect, useContext } from 'react';
import { InternshipContext } from '@/app/context/internshipcontext';

const Settings = () => {
  const { changepassword, passwordChangeStatus } = useContext(InternshipContext);

  // State for password fields
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  // Update user data on form submit
  const handleFormSubmit = async (event) => {
    // Prevent default form submission behavior
    event.preventDefault();

    
    changepassword(currentPassword, newPassword,confirmNewPassword);

    // Clear the password fields after submission
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
  };

  return (
    <div>
      {passwordChangeStatus ? (
        <div>Password Changed successfully!</div>
      ) : (
        <div className="container mx-auto px-4 py-8 w-1/2">
          <h1 className="text-3xl font-bold mb-4">Change your Password</h1>
          <form onSubmit={handleFormSubmit}>
            <div className="flex flex-col space-y-4">
              {/* Old password section */}
              <div className="flex items-center">
                <label className="w-24 text-right" htmlFor="currentPassword">
                  Old Password
                </label>
                <input
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  id="currentPassword"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>

              {/* New password section */}
              <div className="flex flex-col space-y-2">
                <div className="flex items-center">
                  <label className="w-24 text-right" htmlFor="newPassword">
                    New Password
                  </label>
                  <input
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="flex items-center">
                  <label className="w-24 text-right" htmlFor="confirmNewPassword">
                    Confirm Password
                  </label>
                  <input
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    id="confirmNewPassword"
                    type="password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                  />
                </div>
              </div>

              {/* Notification settings section */}
              {/* Add your notification settings fields here */}
              {/* <div className="border rounded-md p-4">...</div> */}

              <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700">
                Save Changes
              </button>
            </div>
          </form>

          {/* Danger zone section */}
          {/* Danger zone section */}
        <div className="bg-red-100 border border-red-400 rounded-md p-4 mt-4">
          <p className="text-red-600">
            <strong>Warning:</strong> Deleting your account is irreversible.
          </p>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
          >
            Delete Account
          </button>
        </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
