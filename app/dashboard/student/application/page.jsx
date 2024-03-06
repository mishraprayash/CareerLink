"use client";
import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { InternshipContext } from "@/app/context/internshipcontext";

const Application = () => {
  const { appliedInternships, loading } = useContext(InternshipContext);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div>
      <div className="text-2xl font-bold px-5 py-3 m-3 bg-slate-300 shadow-lg rounded text-center my-5">Applications</div>
      {appliedInternships === undefined ? (
        <div className="text-center px-4 py-2 rounded shadow-md text-md font-semibold">No any applications found</div>
      ) : (
        <div className="grid grid-cols-1 ">
          {loading ? (
            <div className="text-center font-semibold p-5 m-5">Loading Applications.....</div>
          ) : (
            appliedInternships.map((internship) => (
              <div className="s mx-auto bg-white shadow-md rounded-lg overflow-hidden mb-4 w-full" key={internship.id}>
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{internship.position}</h2>
                  <p className="text-gray-700 mb-2">Company: {internship.companyName}</p>
                  <p className="text-gray-700 mb-2">Location: {internship.location}</p>
                  <p className="text-gray-700 mb-2">Start Date: {new Date(internship.startDate).toLocaleDateString()}</p>
                  <p className="text-gray-700 mb-2">End Date: {new Date(internship.endDate).toLocaleDateString()}</p>
                  <p className="text-gray-700 mb-2">Salary: ${internship.salary}</p>
                  {showDetails && (
                    <div className="mt-4">
                      <p className="text-gray-700 mb-2">Description: {internship.description}</p>
                      <p className="text-gray-700 mb-2">Requirements: {internship.requirements}</p>
                      <p className="text-gray-700 mb-2">Responsibilities: {internship.responsibilities}</p>
                    </div>
                  )}
                  <div className="flex gap-5 justify-end">
                    <button
                      className="text-blue-500 hover:text-blue-700 text-right"
                      onClick={() => setShowDetails(!showDetails)}
                    >
                      {showDetails ? "Hide Details" : "View More"}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Application;
