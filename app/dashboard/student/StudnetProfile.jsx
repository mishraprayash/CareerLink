'use client'
import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from '@/app/context/authcontext';

const StudentProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    setProfileData(user?.student);
  }, [user]);

  return (
    <div className="max-w-md mx-auto my-8 p-6 bg-white rounded shadow-md">
      {profileData ? (
        <>
          <div className="flex items-center mb-4">
            <img
              src={profileData.profilePicture?.secure_url}
              alt="Profile"
              className="w-16 h-16 rounded-full mr-4"
            />
            <h2 className="text-2xl font-bold">{profileData.name}'s Profile</h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              {profileData.email && (
                <p>
                  <strong>Email:</strong> {profileData.email}
                </p>
              )}
              {profileData.gender && (
                <p>
                  <strong>Gender:</strong> {profileData.gender}
                </p>
              )}
              {profileData.age && (
                <p>
                  <strong>Age:</strong> {profileData.age}
                </p>
              )}
              {profileData.about && (
                <p>
                  <strong>About:</strong> {profileData.about}
                </p>
              )}
              {profileData.bio && (
                <p>
                  <strong>Bio:</strong> {profileData.bio}
                </p>
              )}
            </div>
            <div>
              {profileData.address && (
                <p>
                  <strong>Address:</strong>{' '}
                  {`${profileData?.address?.state}, ${profileData?.address?.district}, ${profileData?.address?.street}`}
                </p>
              )}
              {profileData.socialmedia && (
                <p>
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
            </div>
          </div>

          <div className="mt-4">
            <p>
              <strong>Certificates:</strong>
            </p>
            {profileData.certificates && profileData.certificates.map((certificate, index) => (
              <img
                key={index}
                src={certificate?.secure_url}
                alt={`Certificate ${index + 1}`}
                className="w-20 h-20 rounded mr-2 mt-2"
              />
            ))}
          </div>

          {profileData.cv && (
            <div>
              <p>
                <strong>Cv:</strong>
              </p>
              <img
                title="CV"
                src={(profileData?.cv?.secure_url || '').replace(/\.pdf$/, '.jpg')}
                style={{ border: 'none', height: '300px', width: '200px' }}
              />
            </div>
          )}
        </>
      ) : (
        <p>Loading profile data...</p>
      )}
    </div>
  );
};

export default StudentProfile;
