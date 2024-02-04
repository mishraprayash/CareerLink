'use client'
import { postReq } from '@/app/hooks/service';
import React, { useState,  useContext } from 'react';


const CreateInternship = () => {
 const [createinternship,setCreateInternship]=useState(null)

  const [formData, setFormData] = useState({
    position: "",
    location: "",
    isRemote: false,
    workTime: "Full-Time",
    startDate: "",
    endDate: "",
    description: "",
    responsibilities: "",
    requirements: "",
    internshipType: "Paid",
    salary: 0,
    noofVacancy: 1,
  });

  const handleSubmit = async(e) => {
    e.preventDefault();
    setCreateInternship(formData);
    console.log(createinternship)
const response=await postReq("/api/company/createinternship",createinternship)
console.log(response)
if(!response.error){
    window.alert(response.msg)
}
else{
    console.log(response.error)
    window.alert(response.message)
}

  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
 
  return (
    <div className="container mx-auto">
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div>
          <label htmlFor="position" className="block text-sm font-medium text-gray-700">
            Position
          </label>
          <input
            type="text"
            id="position"
            name="position"
            onChange={handleChange}
            value={formData.position}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            onChange={handleChange}
            value={formData.location}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>

        <div>
          <label htmlFor="isRemote" className="block text-sm font-medium text-gray-700">
            Remote
          </label>
          <input
            type="checkbox"
            id="isRemote"
            name="isRemote"
            onChange={(event) => setFormData({ ...formData, [event.target.name]: event.target.checked })}
        checked={formData.isRemote}
            className="mt-1 p-2 border rounded-md"
          />
        </div>

        <div>
          <label htmlFor="workTime" className="block text-sm font-medium text-gray-700">
            Work Time
          </label>
          <select
            id="workTime"
            name="workTime"
            onChange={handleChange}
            value={formData.workTime}
            className="mt-1 p-2 border rounded-md w-full"
          >
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
          </select>
        </div>

        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            onChange={handleChange}
            value={formData.startDate}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>

        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            onChange={handleChange}
            value={formData.endDate}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>
        <div>
          <label htmlFor="internshipType" className="block text-sm font-medium text-gray-700">
            Internship Type
          </label>
          <select
            id="internshipType"
            name="internshipType"
            onChange={handleChange}
            value={formData.internshipType}
            className="mt-1 p-2 border rounded-md w-full"
          >
            <option value="Paid">Paid</option>
            <option value="Un-paid">Un-Paid</option>
            {/* Add more options based on your requirements */}
          </select>
        </div>

        {formData.internshipType === 'Paid' && (
          <div>
            <label htmlFor="salary" className="block text-sm font-medium text-gray-700">
              Salary
            </label>
            <input
              type="number"
              id="salary"
              name="salary"
              onChange={handleChange}
              value={formData.salary}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>
        )}

        {formData.internshipType === 'Paid' && (
          <div>
            <label htmlFor="noofVacancy" className="block text-sm font-medium text-gray-700">
              Number of Vacancies
            </label>
            <input
              type="number"
              id="noofVacancy"
              name="noofVacancy"
              onChange={handleChange}
              value={formData.noofVacancy}
              className="mt"/>
           </div>   
           )}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            onChange={handleChange}
            value={formData.description}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>

        <div>
          <label htmlFor="responsibilities" className="block text-sm font-medium text-gray-700">
            Responsibilities
          </label>
          <textarea
            id="responsibilities"
            name="responsibilities"
            onChange={handleChange}
            value={formData.responsibilities}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>

        <div>
          <label htmlFor="requirements" className="block text-sm font-medium text-gray-700">
            Requirements
          </label>
          <textarea
            id="requirements"
            name="requirements"
            onChange={handleChange}
            value={formData.requirements}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>


        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
          Create Internship
        </button>
      </form>
    </div>
  );
};

export default CreateInternship;