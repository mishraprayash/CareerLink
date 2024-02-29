"use client";
import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "@/app/context/authcontext";


const StudentProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    setProfileData(user?.student);
  }, [user]);

  return (
    <div className=" border mx-32 mt-1 mb-12 p-24 rounded shadow-md">
      {profileData ? (
        <div className=" flex flex-col ">
          <p className="font-semibold text-5xl mb-10 font-mono">PROFILE</p>

          <div className="flex  mb-10 gap-12">
            <div className="   flex justify-start  ">
              <img
                src={profileData.profilePicture?.secure_url}
                alt="Profile"
                className=" w-60 h-60 rounded-full "
              />
            </div>
            <div className=" flex-1  flex flex-col  justify-center items-start text-[20px]">
              <h2 className="text-2xl font-bold">{profileData.name}</h2>
              {profileData.age && (
                <p>
                  <strong>Age:</strong> {profileData.age}
                </p>
              )}
              {profileData.gender && (
                <p>
                  <strong>Gender:</strong> {profileData.gender}
                </p>
              )}
              {profileData.address && (
                <p>
                  <strong>Address:</strong>{" "}
                  {`${profileData?.address?.state}, ${profileData?.address?.district}, ${profileData?.address?.street}`}
                </p>
              )}
              {profileData.email && (
                <p>
                  <strong>Email:</strong> {profileData.email}
                </p>
              )}
            </div>
            {/* <h2 className="text-2xl font-bold">{profileData.name}'s Profile</h2> */}
          </div>

          <div className="border mt-10 mb-4"></div>

          <div className="">
            {profileData.about && (

              <div>
              <p className="text-left text-2xl my-3">
                <strong>About:</strong> </p><p className="text-lg align-middle">{profileData.about}
              </p></div>
            )}
          </div>

          <div className="border my-4"></div>

          <div>
            {profileData.bio && (
              <div>
              <p className="text-left text-2xl my-3 align-middle">
                <strong>Bio:</strong></p>
                <p className="text-lg"> {profileData.bio}
              </p></div>
            )}
          </div>

          <div className="border my-4"></div>

          {/* <div>
            {profileData.socialmedia && (
              <p className="text-left">
                <strong>Social Media:</strong>
                <ul>
                  {profileData.socialmedia.map((social, index) => (
                    <li key={index}>
                      {social.type}: <a href={social.link}>{social.link}</a>
                    </li>
                  ))}
                </ul>
              </p>
            )}
          </div> */}

          {/* </div> */}

          <div className="mt-4 mb-2 ">
            <p>
              <strong>Certificates:</strong>
            </p>
            <div className="flex justify-center items-center">
            {profileData.certificates &&
              profileData.certificates.map((certificate, index) => (
                <img
                  key={index}
                  src={certificate?.secure_url}
                  alt={`Certificate ${index + 1}`}
                  className=" flex-1 max-w-96  h-96 rounded mr-2 mt-2 bg-red-600 "
                />
              ))}
              </div>
          </div>
          <div className="border my-8"></div>
          {profileData.cv && (
            <div>
              <p>
                <strong>Cv:</strong>
              </p>
              <div className="flex justify-center items-center">
              <img
                title="CV"
                src={(profileData?.cv?.secure_url || "").replace(
                  /\.pdf$/,
                  ".jpg"
                )}
                style={{ border: "none", height: "500px", width: "500px",backgroundColor: "red"  }}
              />
              </div>
            </div>
          )}


        </div>
      ) : (
        <p>Loading profile data...</p>
      )}
    </div>
  );
};

export default StudentProfile;
