'use client'
import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from '@/app/context/authcontext';
const CompanyProfile = () => {
    const [company, setCompany] = useState(null)
    const { user } = useContext(AuthContext)
    useEffect(() => {
        if (user && user.company) {
            setCompany(user?.company);
        }
    }, [user]);

    // console.log(user, company)

    if (!user) {
        // Handle the case when user data is not available yet
        return <div>Loading user data...</div>;
    }

    if (!user.company) {
        // Handle the case when the user is not a company
        return <div>You are not a company</div>;
    }

    return (

        <div className="max-w-2xl mx-auto mt-8 p-8 bg-white shadow-md rounded-md">
            {company ? (
                <>
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
                    <p className="text-gray-700">{company.companyDescription}</p>

                    <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-2">Company Information</h3>
                        <p className="text-gray-700">
                            <strong>Industry:</strong> {company.companyInfo}
                        </p>
                        <p className="text-gray-700">
                            <strong>Founded Year:</strong> {company.foundYear}
                        </p>
                        {/* Add more details as needed */}
                    </div>

                    <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
                        <p className="text-gray-700">
                            <strong>Email:</strong> {company.email}
                        </p>
                        <p className="text-gray-700">
                            <strong>Phone Number:</strong> {company.phoneNO}
                        </p>
                        {/* Add more contact details as needed */}
                    </div>

                    <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-2">Address</h3>
                        <p className="text-gray-700">
                            <strong>City:</strong> {company.address.city}
                        </p>
                        <p className="text-gray-700">
                            <strong>State:</strong> {company.address.state}
                        </p>
                        <p className="text-gray-700">
                            <strong>Zip Code:</strong> {company.address.zipCode}
                        </p>
                    </div>

                    {company.registrationFile && (
                        <div className="mt-6">
                            <h3 className="text-lg font-semibold mb-2">Registration File</h3>
                            <a
                                href={company?.registrationFile?.secure_url.replace(/\.pdf$/, '.jpg')}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline"
                            >
                                View Registration File
                            </a>
                        </div>
                    )}

                </>
            ) : (
                <p>Loading profile data...</p>
            )}
        </div>
    );
};


export default CompanyProfile;
