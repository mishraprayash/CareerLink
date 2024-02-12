
'use client'
// pages/signupCompany.js

import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import { postReq } from "@/app/hooks/service";

const SignupCompany = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    companyInfo: {
      category: "Civil Engineering",
      industrySectors: "Construction and Infrastructure"
    },
    city: "",
    state: "",
    zipCode: "",
    foundYear: 2000,
    companyDescription: "",
    phoneNO: "9808766678",
    logo:null,
    registrationFile:null

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
    "Nuclear Engineering"
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
    "Construction and Infrastructure",
    "Mining, Resources",
    "Manufacturing",
    "Technology, Robotics, Automation",
    "Energy, Renewable Energy",
    "Telecommunications, Technology",
    "Transportation, Logistics, Urban Planning",
    "Water Management, Environmental Services",
    "Energy, Nuclear Energy"
];
const handleChange = (event) => {
    const { name, value } = event.target;

    if (name.includes('.')) {
      const [mainKey, nestedKey] = name.split('.');
      setFormData({
        ...formData,
        [mainKey]: {
          ...formData[mainKey],
          [nestedKey]: value
        }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData({...formData,[event.target.name]:file})
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
console.log(formData)
    // try {
        const convertToFormData = () => {
            const formDataObject = new FormData();
          
            // Flatten the nested structure
            const flattenedFormData = {
              ...formData,
              companyInfo: {
                category: formData.companyInfo.category,
                industrySectors: formData.companyInfo.industrySectors,
              },
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
         try {
        const response = await fetch('/api/company/updateprofile',{
          method:'PATCH',
          body:formDataObject
        });
        const data=await response.json()
        // console.log(data)
        window.alert(data.msg)
      if (response.ok) {
        // Redirect to a success page or handle success as needed
        router.push('/dashboard');
      } else {
        console.error(data.error);
        // Handle the error, show an alert, or redirect to an error page
        window.alert(data.msg);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="body">
      <div className="split-screen">
        <div className="right">
          <form onSubmit={handleSubmit}>
          
            
          <div className="input-container company-info-category">
              <label htmlFor="companyInfo.category">Company Category</label>
              <select
                id="companyInfo.category"
                name="companyInfo.category"
                value={formData.companyInfo.category}
                onChange={handleChange}
                className="companyInfo.category"
              >
                {engineeringCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="input-container company-info-industry">
              <label htmlFor="companyInfo.industrySectors">Industry Sectors</label>
              <select
                id="companyInfo.industrySectors"
                name="companyInfo.industrySectors"
                value={formData.companyInfo.industrySectors}
                onChange={handleChange}
                className="companyInfo.industrySectors"
              >
                {industrySectors.map((industry) => (
                  <option key={industry} value={industry}>
                    {industry}
                  </option>
                ))}
              </select>
            </div>

            <div className="input-container city">
              <label htmlFor="city">City</label>
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
              <label htmlFor="state">State</label>
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
              <label htmlFor="zipCode">Zip Code</label>
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
              <label htmlFor="foundYear">Found Year</label>
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
              <label htmlFor="phoneNO">Phone Number</label>
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

            <div className="input-container description">
              <label htmlFor="companyDescription">Company Description</label>
              <textarea
                id="companyDescription"
                name="companyDescription"
                value={formData.companyDescription}
                onChange={handleChange}
                className="companyDescription"
                placeholder="Words to describe the company..."
              ></textarea>
            </div>

            <div className="input-container logo">
              <label htmlFor="logo">Company Logo</label>
              <input
                type="file"
                id="logo"
                name="logo"
                onChange={handleFileChange}
                className="logo"
              />
            </div>

            <div className="input-container registration-file">
              <label htmlFor="registrationFile">Registration File</label>
              <input
                type="file"
                id="registrationFile"
                name="registrationFile"
                onChange={handleFileChange}
                className="registrationFile"
              />
            </div>

            <button className="signup-btn" type="submit">
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupCompany;
