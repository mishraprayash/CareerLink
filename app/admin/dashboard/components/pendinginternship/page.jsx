'use client'
import React, { useContext } from "react";
import Card from '@/app/components/exploreCard.jsx'
import { InternshipContext } from "@/app/context/internshipcontext";

function PendingInternship() {
    const { pendingInternshipsAdmin,accept,reject} = useContext(InternshipContext);
    console.log(pendingInternshipsAdmin);
    return ( 
        <div>
             {pendingInternshipsAdmin && pendingInternshipsAdmin.map((internship) => (
             <div className=" ">
             <div className="text-3xl p-5 m-5 text-center font-mono">Pending Internships</div>
                <Card key={internship._id} internship={internship} />
                <div className="flex justify-center space-x-4">
                    <button onClick={()=>accept(internship._id,internship.role)} className="bg-green-500 text-white px-4 py-2 rounded focus:outline-none focus:shadow-outline-blue active:bg-green-600 hover:bg-green-600">
                        Accept
                    </button>
                    <button onClick={()=>reject(internship._id,internship.role)}  className="bg-green-500 text-white px-4 py-2 rounded focus:outline-none focus:shadow-outline-green active:bg-green-600 hover:bg-green-600">
                        Reject
                    </button>
                </div>
            </div>
            ))}
        </div>
     );
}

export default PendingInternship;
