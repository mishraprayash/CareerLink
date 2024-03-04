"use client";
import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "@/app/context/authcontext";
import { useRouter } from "next/navigation";
const CompanyProfile = () => {
  const router = useRouter();
  const [company, setCompany] = useState(null);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    if (user && user.company) {
      setCompany(user?.company);
    }
  }, [user]);

  // console.log(user, company)

  if (!user) {
    router.push("/loginCompany");
  }

  if (!user.company) {
    // Handle the case when the user is not a company
    return <div>You are not a company</div>;
  }

  return (
    <div className=" mx-10 mt-8 px-14 py-8 my-8 bg-white shadow-md rounded-md">
      {company ? (
        <>
          <div className="flex items-end">
            {company?.logo && (
              <img
                src={company?.logo.secure_url}
                alt={company?.companyName}
                className="w-[50px] h-[50px] rounded-full"
              />
            )}
            <div className=" flex flex-col mb-10">
              <h2 className="text-5xl font-bold ">{company?.companyName}</h2>
              <p className="text-gray-700">{company?.companydescription}</p>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-10 grid-rows-3  ">
            <div className="text-2xl font-semibold mb-2 col-start-1 col-span-5">
              Company Information
            </div>
            <div className="text-gray-700 row-start-2 col-start-2 col-span-3">
              <strong>Industry:</strong> {company?.companyInfo?.industrySectors}
              <br />
              <strong> Category:</strong> {company?.companyInfo?.category}
            </div>
            <div className="text-gray-700 row-start-3 col-start-2 col-span-3">
              <strong>Founded Year:</strong> {company?.foundYear}
            </div>
            {/* Add more details as needed */}
          </div>

          <div className="mt-6  grid grid-cols-10 grid-rows-3 ">
            <div className="text-2xl font-semibold mb-2 col-start-1 col-span-3 ">
              Contact Information
            </div>
            <div className="text-gray-700 row-start-2 col-start-2 col-span-3">
              <strong>Email:</strong> {company?.email}
            </div>
            <div className="text-gray-700 row-start-3 col-start-2 col-span-3">
              <strong>Phone Number:</strong> {company?.phoneNO}
            </div>
            {/* Add more contact details as needed */}
          </div>

          <div className="mt-6  grid grid-cols-10 grid-rows-4">
            <div className="text-2xl  font-semibold mb-2 col-start-1 col-span-3">
              Address
            </div>
            <div className="text-gray-700  row-start-2 col-start-2">
              <strong>City:</strong> {company?.address?.city}
            </div>
            <div className="text-gray-700  row-start-3 col-start-2">
              <strong>State:</strong> {company?.address?.state}
            </div>
            <div className="text-gray-700  row-start-4 col-start-2">
              <strong>Zip Code:</strong> {company?.address?.zipCode}
            </div>
          </div>

          <div className="mt-6  grid grid-cols-10 grid-rows-4">
            <div className="text-2xl  font-semibold mb-2 col-start-1 col-span-3">
              Address
            </div>
            <div className="text-gray-700  row-start-2 col-start-2">
              <strong>City:</strong> {company.address.city}
            </div>
            <div className="text-gray-700  row-start-3 col-start-2">
              <strong>State:</strong> {company.address.state}
            </div>
            <div className="text-gray-700  row-start-4 col-start-2">
              <strong>Zip Code:</strong> {company.address.zipCode}
            </div>
          </div>

          {company.registrationFile && (
            <div className="mt-6 grid grid-cols-10 grid-rows-2">
              <h3 className="text-2xl font-semibold mb-2 col-start-1 col-span-5">
                Registration File
              </h3>
              <a
                href={company?.registrationFile?.secure_url.replace(
                  /\.pdf$/,
                  ".jpg"
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline row-start-2 col-start-2 col-span-4"
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
