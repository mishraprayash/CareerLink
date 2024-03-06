
'use client'
import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { InternshipContext } from '@/app/context/internshipcontext';
const Applicants = ({params}) => {
const {seeApplicants, applicants}=useContext(InternshipContext)


useEffect(()=>{
    const internshipId=params.Id
    console.log(internshipId)
    seeApplicants(internshipId);
},[])
console.log(applicants)
  return (
    <div className="flex flex-wrap gap-10 justify-between my-10">
      {applicants ? (
        applicants.map((applicant)=>{
        return (
        
        <div key={applicant._id} className="flex flex-col w-[45%] justify-center items-center gap-10 shadow-black shadow-md p-5">
          <div className="flex items-center">
            <a href={applicant.profilePicture?.secure_url} target="_blank">
            <img
              src={applicant.profilePicture?.secure_url}
              alt="Profile"
              className="w-16 h-16 rounded-full mr-4"
            />
            </a>
           
            <h2 className="text-2xl font-bold">{applicant.name}'s Profile</h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
            <p>
                <strong>Email:</strong> {applicant.email}
              </p> 
              <p>
                <strong>Gender:</strong> {applicant.gender}
              </p>
              <p>
                <strong>Age:</strong> {applicant.age}
              </p>
              <p>
                <strong>About:</strong> {applicant.about}
              </p>
              <p>
                <strong>Bio:</strong> {applicant.bio}
              </p>
            </div>
            <div>
              <p>
                <strong>Social Media:</strong>
                <ul>
                  {applicant.socialmedia&&applicant.socialmedia.map((social, index) => (
                    <li key={index}>
                      {social.type}: <a href={social.link}>{social.link}</a>
                    </li>
                  ))}
                </ul>
              </p>
            </div>
          </div>

          <div className="mt-4">
            <p>
              <strong>Certificates:</strong>
            </p>
            {applicant.certificates && applicant.certificates.map((certificate, index) => (
              <a href={certificate?.secure_url} target="_blank">
                <img
                key={index}
                src={certificate?.secure_url}
                alt={`Certificate ${index + 1}`}
                className="w-20 h-20 rounded mr-2 mt-2"
              />
              </a>
              
            ))}
          </div>
          <div>
  <p>
    <strong>Cv:</strong>
  </p>
  <a href={(applicant?.cv?.secure_url || '').replace(/\.pdf$/, '.jpg')} target="_blank">
  <img
  title="CV"
  src={(applicant?.cv?.secure_url || '').replace(/\.pdf$/, '.jpg')}
  style={{ border: 'none',height:'300px',width:'200px' }}
/>
</a>

</div>

        </div>
        )
      })
      ) : (
        <p>Loading applicants...</p>
      )}
    </div>
  );
};

export default Applicants;
