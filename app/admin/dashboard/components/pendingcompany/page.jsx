'use client'
import React, { useContext } from "react";
import { InternshipContext } from "@/app/context/internshipcontext";

function PendingCompany() {
    const { pendingCompany, loading ,accept,acceptedStatus,rejectedStatus,reject} = useContext(InternshipContext);

    return (
        <div>
            {
                acceptedStatus&&(window.alert(acceptedStatus))
            }
            {
                rejectedStatus&&(window.alert(rejectedStatus))
            }
            <h1 className="text-3xl font-bold mb-6">Pending Companies</h1>
            {pendingCompany && pendingCompany.map((company) => (
                <div key={company._id} className="border p-6 mb-8 bg-white shadow-md rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-bold">{company?.companyName}</h2>
                        {company?.logo && (
                            <img
                                src={company.logo.secure_url}
                                alt={company.companyName}
                                className="w-16 h-16 rounded-full"
                            />
                        )}
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <span className="font-semibold">Email:</span> {company.email}
                        </div>
                        <p className="text-gray-700">{company.companyDescription}</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Company Information</h3>
                        <p className="text-gray-700">
                            <strong>Industry:</strong> {company.companyInfo}
                        </p>
                        <p className="text-gray-700">
                            <strong>Founded Year:</strong> {company.foundYear}
                        </p>
                        {/* Add more details as needed */}
                    </div>
                    <div className="flex justify-center space-x-4 mt-6">
                        <button onClick={()=>accept(company._id,company.role)}
                         className="bg-green-500 text-white px-4 py-2 rounded focus:outline-none focus:shadow-outline-blue active:bg-green-600">
                            Accept
                        </button>
                        <button  onClick={()=>reject(company._id,company.role)} className="bg-red-500 text-white px-4 py-2 rounded focus:outline-none focus:shadow-outline-red active:bg-red-600">
                            Reject
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default PendingCompany;
