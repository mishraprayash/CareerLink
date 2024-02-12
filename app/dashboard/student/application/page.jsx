"use client"
// pages/history.js

import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { InternshipContext } from '@/app/context/internshipcontext';
const Application = () => {
  const { appliedInternships } = useContext(InternshipContext)
  const [showDetails, setShowDetails] = useState(false);


  return (
    <div className="container mx-auto p-4 w-full">
      <main className="my-4">
        <section>
          <h2 className="text-2xl font-bold mb-4">Applications</h2>
          <div className="grid grid-cols-1 ">
            {appliedInternships && appliedInternships.map((internship) => (
              <div className="s mx-auto bg-white shadow-md rounded-lg overflow-hidden mb-4 w-full">
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
                <button className="text-blue-500 hover:text-blue-700" onClick={() => setShowDetails(!showDetails)}>
                  {showDetails ? 'Hide Details' : 'View More'}
                </button>
              </div>
            </div>
            ))}
          </div>
        </section>
      </main>
    </div >
  );
};

export default Application
