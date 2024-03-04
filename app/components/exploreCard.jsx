
"use client";
import React, { useEffect, useState } from "react";
import "./styles/exploreCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faClock,
  faUser,
  faCoins,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

{
  /* <FontAwesomeIcon  icon={faFilter}  className="  nine h-12 p-2  "/ >*/
}
import { useContext } from "react";
import { InternshipContext} from "../context/internshipcontext";

const exploreCard = ({ internship }) => {
  const {appliedInternships}=useContext(InternshipContext)
  const [isApplied,setIsApplied]=useState(false)
useEffect(()=>{
setIsApplied(appliedInternships&&appliedInternships.some(applied => applied._id === internship._id))
},[appliedInternships])
  const router = useRouter();
  const {
    applyforInternship,
    internshipApplyStatus,
    setInternshipApplyStatus,
  } = useContext(InternshipContext);

  useEffect(() => {
    if (internshipApplyStatus) {
      const timeoutId = setTimeout(() => {
        setInternshipApplyStatus(null);
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [internshipApplyStatus]);

  return (
    <div className="bg-[rgba(241,241,241,0.8)] shadow-sm rounded-lg overflow-hidden shadow-black">
      <div className="p-6 flex items-center justify-between">
        <div className="flex gap-2 w-full justify-center">
          <div>
            {internship?.companyLogo && (
              <img
                src={internship?.companyLogo.secure_url}
                alt={internship?.companyName}
                className="w-16 h-16 rounded-full border-2 border-red-300"
              />
            )}
          </div>
          <div className="ml-5">
            <div className="text-xl font-bold">{internship?.position.toUpperCase()}</div>
            <div className="text-gray-500">{internship?.companyName}</div>
            <div className="text-gray-500">{internship?.location.toUpperCase()}</div>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="flex justify-between mb-4">
          <div className="flex items-center">
            <FontAwesomeIcon
              icon={faLocationDot}
              size="lg"
              className="text-black mr-2"
            />
            <div>
              <div className="text-sm font-semibold">Location</div>
              <div className="text-gray-500">{internship?.location.toUpperCase()}</div>
            </div>

            <div className="appy-btn">
              {/* <a href="/" target="_blank">
                Apply
                </a> */}
              {isApplied ? (
              <button disabled>Applied</button>
            ) : (
              <button onClick={() => applyforInternship(internship?._id.toString())}>Apply</button>
            )}
            </div>
          </div>
        </div>
        <div>
          <div className="text-[1.2rem] font-semibold text-center">Required Qualifications</div>
          <div className="p-3 m-2 font-mono font-semibold">{internship?.requirements}</div>
        </div>
      </div>
      <div className="p-6 flex justify-center">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4"
          onClick={() => router.push(`/explore/${internship?._id}`)}
        >
          View More
        </button>
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={() => applyforInternship(internship?._id.toString())}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default exploreCard;
