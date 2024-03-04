"use client";
import React, { useContext } from "react";
import Card from "@/app/components/exploreCard.jsx";
import { InternshipContext } from "@/app/context/internshipcontext";
import { useRouter } from "next/navigation";

function MyInternship() {
  const {
    runningInternships,
    pendingInternships,
    seeApplicants,
    applicants,
    loading,
  } = useContext(InternshipContext);
  const router = useRouter(); // Initialize router

  const handleSeeApplicants = (e, internshipId) => {
    e.preventDefault(); // Prevent default action
    // seeApplicants(internshipId);
    router.push(`/dashboard/company/internship/${internshipId}/applicants`); // Navigate to applicants route
  };

  return loading ? (
    <div className="text-center p-4 m-2 shadow-xl h-[90vh]">Loading Internships....</div>
  ) : (
    <>
      <div className="text-center p-4 m-2 shadow-sm shadow-black bg-slate-300 font-bold">
        Running Internships
      </div>
      {runningInternships !== null && runningInternships !== undefined ? (
        runningInternships?.map((internship) => (
          <div className="m-2 p-2" key={internship._id}>
            <Card internship={internship} />
            <div className="flex justify-center space-x-4 m-5 rounded p-3 shadow-black shadow-sm bg-slate-100">
              <button className="bg-green-500 text-white px-4 py-2 rounded focus:outline-none focus:shadow-outline-blue active:bg-green-600 hover:bg-green-600">
                Update
              </button>
              <button
                onClick={(e) => handleSeeApplicants(e, internship._id)}
                className="bg-green-500 text-white px-4 py-2 rounded focus:outline-none focus:shadow-outline-green active:bg-green-600 hover:bg-green-600"
              >
                See Applicants
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="p-4 m-2 text-center bg-blue-300 shadow-sm shadow-black font-thin">
          No any applied internships to show
        </div>
      )}
      <div className="text-center p-4 m-2 shadow-sm shadow-black bg-slate-300 font-bold">
        Pending Internships
      </div>
      {pendingInternships !== null && pendingInternships !== undefined ? (
        pendingInternships?.map((internship) => (
          <div className="m-2 p-2" key={internship._id}>
            <Card internship={internship} />
            <div className="flex justify-center space-x-4 m-5 rounded p-3 shadow-black shadow-sm bg-slate-100">
              <button className="bg-green-500 text-white px-4 py-2 rounded focus:outline-none focus:shadow-outline-blue active:bg-green-600 hover:bg-green-600">
                Update
              </button>
              <button className="bg-green-500 text-white px-4 py-2 rounded focus:outline-none focus:shadow-outline-green active:bg-green-600 hover:bg-green-600">
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="p-4 m-2 text-center bg-blue-300 shadow-sm shadow-black font-thin">
          No any internship pending at the moment
        </div>
      )}
    </>
  );
}

export default MyInternship;
