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

  return (
    <>
      <div className="text-4xl mt-4 text-mono ml-8">Running Internships</div>
      {runningInternships &&
        runningInternships.map((internship) => (
          <div className="" key={internship._id}>
            <Card internship={internship} />
            <div className="flex justify-center space-x-4">
              <button className="bg-green-500 text-white px-4 py-2 rounded focus:outline-none focus:shadow-outline-blue active:bg-green-600">
                Update
              </button>
              <button
                onClick={(e) => handleSeeApplicants(e, internship._id)}
                className="bg-green-500 text-white px-4 py-2 rounded focus:outline-none focus:shadow-outline-green active:bg-green-600"
              >
                See Applicants
              </button>
            </div>
          </div>
        ))}
      <div className="text-4xl mt-4 text-mono ml-12">Pending Internships</div>
      {pendingInternships &&
        pendingInternships.map((internship) => (
          <div className="" key={internship._id}>
            <Card internship={internship} />
            <div className="flex justify-center space-x-4">
              <button className="bg-green-500 text-white px-4 py-2 rounded focus:outline-none focus:shadow-outline-blue active:bg-green-600">
                Update
              </button>
              <button className="bg-green-500 text-white px-4 py-2 rounded focus:outline-none focus:shadow-outline-green active:bg-green-600">
                Delete
              </button>
            </div>
          </div>
        ))}
    </>
  );
}

export default MyInternship;
