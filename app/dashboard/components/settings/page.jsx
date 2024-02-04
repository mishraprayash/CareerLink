"use client"
import React, { useState, useEffect } from 'react';

const Settings = () => {
 
  

  // Update user data on form submit
  const handleFormSubmit = async (event) => {
   
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Change your Password</h1>

      <div className="flex flex-col space-y-4">
        {/* Old password section */}
        <div className="flex items-center">
          <label className="w-24 text-right" htmlFor="oldPassword">
            Old Password
          </label>
          <input
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            id="oldPassword"
            type="password"
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
            />
          </div>
          <div className="flex items-center">
            <label className="w-24 text-right" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              id="confirmPassword"
              type="password"
            />
          </div>
        </div>

        {/* Notification settings section */}
        <div className="border rounded-md p-4">
          <div className="flex items-center">
            <input
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              type="checkbox"
              id="emailNotifications"
            />
            <label className="ml-3" htmlFor="emailNotifications">
              Receive email notifications
            </label>
          </div>
          {/* Add other notification settings fields as needed */}
        </div>

        {/* Danger zone section */}
        <div className="bg-red-100 border border-red-400 rounded-md p-4">
          <p className="text-red-600">
            <strong>Warning:</strong> Deleting your account is irreversible.
          </p>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
          >
            Delete Account
          </button>
        </div>

        <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Settings;
