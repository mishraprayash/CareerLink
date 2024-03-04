"use client";
import React, { useState, useEffect, useContext } from "react";
import { InternshipContext } from "@/app/context/internshipcontext";
import { AuthContext } from "@/app/context/authcontext";

const Settings = () => {
  const { changepassword, passwordChangeStatus } =
    useContext(InternshipContext);

  const { user } = useContext(AuthContext);

  // State for password fields
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  // Update user data on form submit
  const handleFormSubmit = async (event) => {
    // Prevent default form submission behavior
    event.preventDefault();

    changepassword(currentPassword, newPassword, confirmNewPassword);

    // Clear the password fields after submission
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
  };

  return (
    <>
      {user?.admin && (
        <div>
          {passwordChangeStatus ? (
            <div>Password Changed successfully!</div>
          ) : (
            <div className="border border-black p-5 m-5 rounded-lg">
              <h1 className="text-2xl font-bold m-4 text-center font-mono">
                Change your Password
              </h1>
              <form onSubmit={handleFormSubmit}>
                <div className="flex flex-col gap-5 items-center w-full">
                  <div className="mx-2 p-2">
                    <label className="mx-3 p-2" htmlFor="currentPassword">
                      Old Password
                    </label>
                    <input
                      className=" px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      id="currentPassword"
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                  </div>

                  {/* New password section */}
                  <div className="flex flex-col gap-5">
                    <div className="flex">
                      <label className="mx-3 p-2" htmlFor="newPassword">
                        New Password
                      </label>
                      <input
                        className="px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                        id="newPassword"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </div>
                    <div className="flex">
                      <label className="mx-3 py-2" htmlFor="confirmNewPassword">
                        Confirm Password
                      </label>
                      <input
                        className=" px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                        id="confirmNewPassword"
                        type="password"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="py-5">
                    <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700">
                      Save Changes
                    </button>
                  </div>
                </div>
              </form>

              <div className="bg-red-100 border border-red-400 rounded-md p-4 mt-4">
                <p className="text-red-600">
                  <strong>Warning:</strong> Deleting your account is
                  irreversible.
                </p>
                <div className="flex justify-center py-5">
                  <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Settings;
