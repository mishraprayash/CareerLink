"use client"
import React, { useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faClock, faCoins, faBriefcase, faArrowLeft, faUser } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { InternshipContext } from '../context/internshipcontext';
import Image from "next/image";

const ExploreCardFull = ({ internship }) => {
  const router = useRouter();

  const handleBackToExplore = () => {
    router.push('/explore');
  }
  const { applyforInternship, internshipApplyStatus, setInternshipApplyStatus } = useContext(InternshipContext)
  useEffect(() => {
    if (internshipApplyStatus) {
      const timeoutId = setTimeout(() => {
        setInternshipApplyStatus(null);
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [internshipApplyStatus]);

  return (
    <div className='flex flex-col items-center h-[100vh]'>
      <div className='flex flex-row border border-gray-200 rounded p-4 mt-4'>
        <div className='flex flex-col items-center w-1/4'>
          <div className='mb-4'>
            <Image className="rounded-full" src={internship?.companyLogo?.secure_url} alt='Company Logo' width={50} height={50}/>
          </div>
          <div className='text-lg font-bold'>{internship?.companyName}</div>
          <div className="flex flex-col mt-4">
            <div className='flex items-center mb-2'>
              <FontAwesomeIcon icon={faLocationDot} size="2x" className="text-green-500 mr-2" />
              <div className="font-semibold">Location</div>
              <div className="ml-2">{internship?.location}</div>
            </div>
            <div className='flex items-center mb-2'>
              <FontAwesomeIcon icon={faClock} size="2x"  className="text-green-500 mr-2" />
              <div className="font-semibold">Time</div>
              <div className="ml-2">{internship?.workTime}</div>
            </div>
            <div className='flex items-center mb-2'>
              <FontAwesomeIcon icon={faBriefcase} className="text-green-500 mr-2" size="2x" />
              <div className="font-semibold">Position</div>
              <div className="ml-2">{internship?.position}</div>
            </div>
            <div className='flex items-center mb-2'>
              <FontAwesomeIcon icon={faUser} size="2x" className="text-green-500 mr-2" />
              <div className="font-semibold">Openings</div>
              <div className="ml-2">{internship?.noofVacancy}</div>
            </div>
            <div className='flex items-center mb-2' size="2x" >
              <FontAwesomeIcon icon={faCoins} size="2x"  className="text-green-500 mr-2" />
              <div className="font-semibold">Salary</div>
              <div className="ml-2">${internship?.salary} per week</div>
            </div>
          </div>
        </div>
        <div className='ml-8 w-3/4'>
          <div className='mb-4'>
            <h4 className="text-lg font-bold text-black">Job Description</h4>
            <div>{internship?.description}</div>
          </div>
          <div className='mb-4'>
            <h4 className="text-lg font-bold text-black">Responsibilities of Candidates</h4>
            <ul className="list-disc list-inside">
              <li>{internship?.responsibilities}</li>
            </ul>
          </div>
          <div className='mb-4'>
            <h4 className="text-lg font-bold text-black">Requirements</h4>
            <ul className="list-disc list-inside">
              <li>{internship?.requirements}</li>
            </ul>
          </div>
          <div className="internship-skills">
            {internship?.skillsRequired && internship?.skillsRequired?.length > 0 && (
              <>
                <div className="font-semibold">Skills Required:</div>
                <ul className="list-disc pl-4">
                  {/* Iterate over skills required and display them */}
                  {internship?.skillsRequired.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
          <div className='flex justify-end'>
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mx-4"  onClick={() => applyforInternship(internship?._id.toString())}>Apply Now</button>
            <button onClick={handleBackToExplore} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center mx-4">
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
              Back to Explore
            </button>
          </div>
        </div>
      </div>
      {internshipApplyStatus && (
        <div style={overlayStyle}>
          <div style={messageBoxStyle}>
            {internshipApplyStatus}
          </div>
        </div>
      )}
    </div>
  );
}

export default ExploreCardFull;