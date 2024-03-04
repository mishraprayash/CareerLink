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
          formDataObject.append(
            key,
            typeof value !== "string" ? String(value) : value
          );
        }
      }
      return formDataObject;
    };

    const formDataObject = convertToFormData();
    try {
      const response = await fetch("/api/company/updateprofile", {
        method: "PATCH",
        body: formDataObject,
      });
      const data = await response.json();
      if (response.ok) {
        // Redirect to a success page or handle success as needed
        router.push("/dashboard");
        ToastMessage("Success", data.msg);
      } else {
        console.error(data.msg);
        console.error(data.msg);
        // Handle the error, show an alert, or redirect to an error page
        ToastMessage("Warning", data.msg);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 shadow-lg justify-center"
      >
        <div className="flex justify-between">
          <label
            htmlFor="companyInfo.category"
            className="p-3 m-2 text-gray-600 font-bold"
          >
            Company Category
          </label>
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

        <div className="input-container company-info-industry flex justify-between m-3">
          <label
            htmlFor="companyInfo.industrySectors"
            className=" p-2 text-gray-600 font-bold"
          >
            Industry Sectors
          </label>
          <select
            id="industrySectors"
            name="industrySectors"
            value={formData.industrySectors}
            onChange={handleChange}
            className="w-[300px]"
          >
            {industrySectors.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
        </div>

        <div className="input-container company-info-category">
          <label htmlFor="companyInfo.category">Company Category</label>
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

        <div className="input-container city">
          <label htmlFor="city" className="p-3 m-2 text-gray-600 font-bold">
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="city"
            placeholder="pokhara"
          />
        </div>

        <div className="input-container state">
          <label htmlFor="state" className="p-3 m-2 text-gray-600 font-bold">
            State
          </label>
          <input
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="state"
            placeholder="gandaki"
          />
        </div>

        <div className="input-container zip-code">
          <label htmlFor="zipCode" className="p-3 m-2 text-gray-600 font-bold">
            Zip Code
          </label>
          <input
            type="text"
            id="zipCode"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            className="zipCode"
            placeholder="112"
          />
        </div>

        <div className="input-container found-year">
          <label
            htmlFor="foundYear"
            className="p-3 m-2 text-gray-600 font-bold"
          >
            Found Year
          </label>
          <input
            type="number"
            id="foundYear"
            name="foundYear"
            value={formData.foundYear}
            onChange={handleChange}
            className="foundYear"
            placeholder="2000"
          />
        </div>

        <div className="input-container phone">
          <label htmlFor="phoneNO" className="p-3 m-2 text-gray-600 font-bold">
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNO"
            name="phoneNO"
            value={formData.phoneNO}
            onChange={handleChange}
            className="phoneNO"
            placeholder="+061-123456"
            pattern="+[0-9]-[0-9]{6}"
          />
        </div>

        <div className="input-container description flex flex-col justify-center">
          <label
            htmlFor="companyDescription"
            className="p-3 m-2 text-gray-600 font-bold"
          >
            Company Description
          </label>
          <textarea
            id="companyDescription"
            name="companyDescription"
            value={formData.companyDescription}
            onChange={handleChange}
            className="p-3 mx-2 my-1 bg-gray-200"
            placeholder="Words to describe the company..."
          ></textarea>
        </div>

        <div className="input-container logo">
          <label htmlFor="logo" className="p-3 m-2 text-gray-600 font-bold">
            Company Logo
          </label>
          <input
            type="file"
            id="logo"
            name="logo"
            onChange={handleFileChange}
            className="logo"
          />
        </div>

        <div className="input-container registration-file">
          <label
            htmlFor="registrationFile"
            className="p-3 m-2 text-gray-600 font-bold"
          >
            Registration File
          </label>
          <input
            type="file"
            id="registrationFile"
            name="registrationFile"
            onChange={handleFileChange}
            className="registrationFile"
          />
        </div>

        <button
          className="bg-green-400 rounded px-3 py-2 mt-2 font-medium"
          type="submit"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default SignupCompany;
