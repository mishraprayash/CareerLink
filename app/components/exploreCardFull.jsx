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
    <div className='flex flex-col  justify-center items-center'>
      <div className='flex flex-col  justify-center items-center border border-gray-200 rounded p-10 mt-4 w-[70%]'>
        <div className='flex flex-col justify-center items-center '>
          <div className='mb-4 flex flex-col justify-center items-center'>
            <img className="w-56 h-56 rounded-full" src={internship?.companyLogo?.secure_url} alt='Company Logo' />
          </div>
          <div className='text-3xl font-bold mt-1'>{internship?.companyName}</div>
          <div className="grid grid-cols-5 gap-2  w-[100%] mt-12 ">

            <div className='grid grid-cols-5 grid-rows-4'>
              <div className="row-start-1 col-start-2 row-span-2 ">
              <FontAwesomeIcon icon={faLocationDot} size="2x" className="text-green-500 mr-2" /></div>
               <div className="font-semibold row-start-1 col-start-3 col-span-2">Location</div>
              <div className="row-start-2 col-start-3 col-span-2">{internship?.location}</div>
            </div>

            <div className='grid grid-cols-5 grid-rows-4'>
            <div className="row-start-1 col-start-2 row-span-2 ">
              <FontAwesomeIcon icon={faClock} size="2x"  className="text-green-500 mr-2" /></div>
              <div className="font-semibold row-start-1 col-start-3 col-span-2">Time</div>
              <div className="row-start-2 col-start-3 col-span-2">{internship?.workTime}</div>
            </div>

           <div className='grid grid-cols-5 grid-rows-4'>
           <div className="row-start-1 col-start-2 row-span-2 ">
              <FontAwesomeIcon icon={faBriefcase} className="text-green-500 mr-2" size="2x" /></div>
              <div className="font-semibold row-start-1 col-start-3 col-span-2">Position</div>
              <div className="row-start-2 col-start-3 col-span-2">{internship?.position}</div>
            </div>
            <div className='grid grid-cols-5 grid-rows-4'>
            <div className="row-start-1 col-start-2 row-span-2 ">
              <FontAwesomeIcon icon={faUser} size="2x" className="text-green-500 mr-2" /></div>
              <div className="font-semibold row-start-1 col-start-3 col-span-2">Openings</div>
              <div className="row-start-2 col-start-3 col-span-2">{internship?.noofVacancy}</div>
            </div>

            <div className='grid grid-cols-5 grid-rows-3'>
            <div className="row-start-1 col-start-2 row-span-2 ">
              <FontAwesomeIcon icon={faCoins} size="2x"  className="text-green-500 mr-2" /></div>
              <div className="font-semibold row-start-1 col-start-3 col-span-2">Salary(pm)</div>
              <div className="row-start-2 col-start-3 col-span-2">${internship?.salary} </div>
            </div>
          </div>
        </div>


        <div className='mt-10 w-[100%]'>
          <div className='m-10'>
            <h4 className="text-2xl font-bold text-black">Job Description</h4>
            <p className='flex items-start'>{internship?.description}</p>
          </div>
          <div className='m-10'>
            <h4 className="text-2xl font-bold text-black">Responsibilities of Candidates</h4>
            <ul className="list-disc list-inside">
              <li>{internship?.responsibilities}</li>
            </ul>
          </div>
          <div className='m-10'>
            <h4 className="text-2xl font-bold text-black">Requirements</h4>
            <ul className="list-disc list-inside">
              <li>{internship?.requirements}</li>
            </ul>
          </div>
          <div className="internship-skills m-10">
            {internship?.skillsRequired && internship?.skillsRequired.length > 0 && (
              <>
                <p className="font-semibold text-2xl">Skills Required:</p>
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