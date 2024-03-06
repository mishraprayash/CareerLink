"use client";
import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "@/app/context/authcontext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";

const StudentProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    setProfileData(user?.student);
  }, [user]);

  return (
    <div className="flex justify-center border w-[80%] mx-auto my-8 p-24 rounded shadow-md">
      {profileData ? (
        <div className=" flex flex-col ">
          <p className="font-semibold text-3xl mb-10 font-mono">PROFILE</p>

          <div className="flex  mb-10 gap-12">
            <div className="flex items-center">
              <img
                src={profileData.profilePicture?.secure_url}
                alt="Profile"
                className=" w-[5rem] h-[5rem] rounded-full text-center"
              />
            </div>
            <div className=" flex-1  flex flex-col  justify-center items-start text-[20px]">
              <div className="text-xl">
                <strong className="mr-2">Name:</strong>
                {profileData.name}
              </div>
              {profileData.age && (
                <p>
                  <strong className="mr-2">Age:</strong> {profileData.age}
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
                  <strong className="mr-2">Email:</strong> {profileData.email}
                </p>
              )}
            </div>
            {/* <h2 className="text-2xl font-bold">{profileData.name}'s Profile</h2> */}
          </div>
          <div className="">
            {profileData.about && (
              <div>
                <p className="text-left text-2xl my-3">
                  <strong>About:</strong>{" "}
                </p>
                <p className="text-lg align-middle">{profileData.about}</p>
                <div className="border my-4"></div>
              </div>
            )}
          </div>

          <div>
            {profileData.bio && (
              <div>
                <p className="text-left text-2xl my-3 align-middle">
                  <strong>Bio:</strong>
                </p>
                <p className="text-lg"> {profileData.bio}</p>
                <div className="border my-4"></div>
              </div>
            )}
          </div>

          <div>
            {profileData.socialmedia && (
              <p className="text-center">
                <strong>Social Media</strong>
                <ul>
                  {profileData.socialmedia.map((social, index) => (
                    <li key={index}>
                      <a href={social.link}>
                        <FontAwesomeIcon
                          icon={
                            social.type === "github"
                              ? faGithub
                              : social.type === "linkedin"
                              ? faLinkedin
                              : social.type === "other"
                              ? faUsers
                              : null
                          }
                          size="sm"
                          className="h-12 p-2 text-[#0F1035]"
                        />
                      </a>
                      {/*   
                      {social.type==="github"}: <a href={social.link}>{social.link}</a> */}
                    </li>
                  ))}
                </ul>
              </p>
            )}
          </div>

          {/* </div> */}

          {profileData.certificates && (
            <div className="my-10">
              <p>
                <strong>Certificates</strong>
              </p>
              <div className="flex justify-center items-center">
                {profileData.certificates.map((certificate, index) => (
                  <a href={certificate?.secure_url} target="_blank">
                    <img
                      key={index}
                      src={certificate?.secure_url}
                      alt={`Certificate ${index + 1}`}
                      className=" flex-1 max-w-96  h-96 rounded mr-2 mt-2 bg-red-600 "
                    />
                  </a>
                ))}
              </div>
            </div>
          )}

          <div className="border my-8"></div>

          {profileData.cv && (
            <div>
              <p>
                <strong>CV</strong>
              </p>
              <div className="flex justify-center items-center">
                <a
                  href={(profileData?.cv?.secure_url || "").replace(
                    /\.pdf$/,
                    ".jpg"
                  )}
                  target="_blank"
                >
                  <img
                    title="CV"
                    src={(profileData?.cv?.secure_url || "").replace(
                      /\.pdf$/,
                      ".jpg"
                    )}
                    style={{
                      border: "none",
                      height: "500px",
                      width: "500px",
                      backgroundColor: "red",
                    }}
                  />
                </a>
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
