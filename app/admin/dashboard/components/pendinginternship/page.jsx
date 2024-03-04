'use client'
import React, { useContext } from "react";
import Card from '@/app/components/exploreCard.jsx'
import { InternshipContext } from "@/app/context/internshipcontext";

function PendingInternship() {
    const { pendingInternshipsAdmin,accept,acceptedStatus,reject,rejectedStatus, loading } = useContext(InternshipContext);
    console.log(pendingInternshipsAdmin);
    return ( 
        <div>
             <div className="text-4xl mt-4 ml-12">Pending Internships</div>
             {/* {
                acceptedStatus&&(window.alert(acceptedStatus))
            } {
                rejectedStatus&&(window.alert(rejectedStatus))
            } */}
             {pendingInternshipsAdmin && pendingInternshipsAdmin.map((internship) => (<div className=" ">
                <Card key={internship._id} internship={internship} />
                <div className="flex justify-center space-x-4">
                    <button onClick={()=>accept(internship._id,internship.role)}className="bg-green-500 text-white px-4 py-2 rounded focus:outline-none focus:shadow-outline-blue active:bg-green-600">
                        Accept
                    </button>
                    <button onClick={()=>reject(internship._id,internship.role)}  className="bg-green-500 text-white px-4 py-2 rounded focus:outline-none focus:shadow-outline-green active:bg-green-600">
                        Reject
                    </button>
                </div>

            </div>
            ))}
        </div>
     );
}

export default PendingInternship;
