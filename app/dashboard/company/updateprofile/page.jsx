"use client";
// pages/signupCompany.js

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { postReq } from "@/app/hooks/service";
import { ToastMessage } from "@/app/components/ToastMessage";

const SignupCompany = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    category: "",
    industrySectors: "",
    city: "",
    state: "",
    zipCode: "",
    foundYear: 2000,
    companyDescription: "",
    phoneNO: "9808766678",
    logo: null,
    registrationFile: null,
  });
  const engineeringCategories = [
    "Civil Engineering",
    "Mechanical Engineering",
    "Electrical Engineering",
    "Aerospace and Defense",
    "Chemical Engineering",
    "Environmental Engineering",
    "Software and Computer Engineering",
    "Biomedical Engineering",
    "Structural Engineering",
    "Mining and Geological Engineering",
    "Manufacturing Engineering",
    "Robotics Engineering",
    "Renewable Energy",
    "Telecommunications Engineering",
    "Transportation Engineering",
    "Water Resources Engineering",
    "Nuclear Engineering",
  ];

  const industrySectors = [
    "Construction and Infrastructure",
    "Manufacturing, Automotive, Mechanical Systems",
    "Electronics, Telecommunications, Power",
    "Aerospace, Defense, Aviation",
    "Chemicals, Petrochemicals, Pharmaceuticals",
    "Environmental Services, Sustainability",
    "Technology, Information Technology (IT), Software Development",
    "Healthcare, Biotechnology, Medical Devices",
    "Mining, Resources",
    "Manufacturing",
    "Technology, Robotics, Automation",
    "Energy, Renewable Energy",
    "Telecommunications, Technology",
    "Transportation, Logistics, Urban Planning",
    "Water Management, Environmental Services",
    "Energy, Nuclear Energy",
  ];
  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name.includes(".")) {
      const [mainKey, nestedKey] = name.split(".");
      setFormData({
        ...formData,
        [mainKey]: {
          ...formData[mainKey],
          [nestedKey]: value,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData({ ...formData, [event.target.name]: file });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    // try {
    const convertToFormData = () => {
      const formDataObject = new FormData();

      // Flatten the nested structure
      const flattenedFormData = {
        ...formData,
      };

      // Append each key-value pair to FormData
      for (const [key, value] of Object.entries(flattenedFormData)) {
        // If it's a file, append it to FormData
        if (value instanceof File) {
          formDataObject.append(key, value);
        } else {
          // If it's not a file, convert non-string values to strings before appending
          formDataObject.append(key, typeof value !== 'string' ? String(value) : value);
        }
      }

      return formDataObject;
    };
    const formDataObject = convertToFormData();
    console.log(formDataObject)
    try {
      const response = await fetch('/api/company/updateprofile', {
        method: 'PATCH',
        body: formDataObject
      });
      const data = await response.json()
      if (response.ok) {
        // Redirect to a success page or handle success as needed
        router.push('/dashboard');
        ToastMessage("Success", data.msg)
      } else {
        console.error(data.msg);
        console.error(data.msg);
        // Handle the error, show an alert, or redirect to an error page
        ToastMessage("Warning", data.msg)
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="  mt-10 text-2xl m-10 px-20 py-8 shadow-2xl border-solid ">
    
        <div className="font-bold text-4xl flex justify-center items-center mb-20">Update Profile</div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
            
          <div className="h-14 flex items-center">
              <label htmlFor="companyInfo.category" className="font-bold mr-7 w-72">Company Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="category"
              >
                {engineeringCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="input-container company-info-industry">
              <label htmlFor="industrySectors">Industry Sectors</label>
              <select
                id="industrySectors"
                name="industrySectors"
                value={formData.industrySectors}
                onChange={handleChange}
                className="industrySectors"
              >
                {industrySectors.map((industry) => (
                  <option key={industry} value={industry}>
                    {industry}
                  </option>
                ))}
              </select>
            </div>

            <div className="h-14 flex items-center">
              <label htmlFor="city" className="font-bold mr-7 w-72">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="flex-1 text-2xl p-2  shadow-lg hover:text-green-400"
                placeholder="Pokhara"
              />
            </div>

            <div className="h-14 flex items-center">
              <label htmlFor="state" className="font-bold mr-7 w-72">State</label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="flex-1 text-2xl p-2  shadow-lg hover:text-green-400"
                placeholder="gandaki"
              />
            </div>

            <div className="h-14 flex items-center">
              <label htmlFor="zipCode" className="font-bold mr-7 w-72">Zip Code</label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                className="flex-1 text-2xl p-2  shadow-lg hover:text-green-400"
                placeholder="112"
              />
            </div>

            <div className="h-14 flex items-center">
              <label htmlFor="foundYear" className="font-bold mr-7 w-72">Found Year</label>
              <input
                type="number"
                id="foundYear"
                name="foundYear"
                value={formData.foundYear}
                onChange={handleChange}
                className="flex-1 text-2xl p-2  shadow-lg hover:text-green-400"
                placeholder="2000"
              />
            </div>

            <div className="h-14 flex items-center">
              <label htmlFor="phoneNO" className="font-bold mr-7 w-72">Phone Number</label>
              <input
                type="tel"
                id="phoneNO"
                name="phoneNO"
                value={formData.phoneNO}
                onChange={handleChange}
                className="flex-1 text-2xl p-2  shadow-lg hover:text-green-400"
                placeholder="+061-123456"
                pattern="+[0-9]-[0-9]{6}"
              />
            </div>

            <div className="h-14 m-2 flex items-center">
              <label htmlFor="companyDescription" className="font-bold mr-7 w-72">Company Description</label>
              <textarea
                id="companyDescription"
                name="companyDescription"
                value={formData.companyDescription}
                onChange={handleChange}
                className="flex-1 text-2xl p-2  shadow-lg hover:text-green-400"
                placeholder="Words to describe the company..."
              ></textarea>
            </div>

            <div className="h-14 m-2 flex items-center">
              <label htmlFor="logo" className="font-bold mr-7 w-72">Company Logo</label>
              <input
                type="file"
                id="logo"
                name="logo"
                onChange={handleFileChange}
                className="flex-1 text-2xl p-2  shadow-lg"
              />
            </div>

            <div className="h-14 m- 2 flex items-center">
              <label htmlFor="registrationFile" className="font-bold mr-7 w-72">Registration File</label>
              <input
                type="file"
                id="registrationFile"
                name="registrationFile"
                onChange={handleFileChange}
                className="flex-1 text-2xl p-2  shadow-lg "
              />
            </div>

            <button className=" mt-10 w-full text-2xl block bg-blue-500 text-white p-2 rounded transition:1s hover:bg-pink-400 hover:-translate-y-1 hover:scale-110 duration-500
      " type="submit">
              Update Profile
            </button>
          </form>
        </div>
    
  );
};

export default SignupCompany;