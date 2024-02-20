'use client'
import React, { useContext } from "react";
import Card from '@/app/components/exploreCard'
import { InternshipContext } from "@/app/context/internshipcontext";

function MyInternship() {
    const { runningInternships,pendingInternships,seeApplicants,applicants, loading } = useContext(InternshipContext);
    console.log(pendingInternships);

    return (
        <>
            <div>Running Internships</div>
            {runningInternships && runningInternships.map((internship) => (<div className="border border-blue-900 ">
                <Card key={internship._id} internship={internship} />
                <div className="flex justify-center space-x-4">
                    <button className="bg-green-500 text-white px-4 py-2 rounded focus:outline-none focus:shadow-outline-blue active:bg-green-600">
                        Update
                    </button>
                    <button onClick={seeApplicants(internship._id)} className="bg-green-500 text-white px-4 py-2 rounded focus:outline-none focus:shadow-outline-green active:bg-green-600">
                        See Applicants
                    </button>
                </div>

            </div>
            ))}
             <div>Pending Internships</div>
             {pendingInternships && pendingInternships.map((internship) => (<div className="border border-blue-900 ">
                <Card key={internship._id} internship={internship} />
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
            {
                applicants&&applicants.map((applicant)=>{
                    <div>{applicant?.name}</div>
                })
            }
        </>
    );
}

export default MyInternship;