'use client'
import { ToastMessage } from '@/app/components/ToastMessage';
import { postReq } from '@/app/hooks/service';
import React, { useState,  useContext } from 'react';
import { useRouter } from 'next/navigation';

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
    internshipType: "",
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
    // window.alert(response.msg)
    ToastMessage("Success",response.msg)
    const router=useRouter()
    router.push('/dashboard/company/internship')
}
else{
    console.log(response.error)
    ToastMessage("Error",response.msg)
    // window.alert(response.message)
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
    <div className="container mx-auto w-full">
      <div className='text-4xl text-center  justify-center text-[#108A00]'> Create internship opportunity</div>
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className='w-1/2'>
          <label htmlFor="position" className=" text-sm font-medium text-gray-700">
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

        <div  className='w-1/2 '> 
          <label htmlFor="location" className=" text-sm font-medium text-gray-700">
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

        
<div className="flex flex-row items-center justify-center">
        <div className='w-1/2'>
          <label htmlFor="workTime" className=" text-sm font-medium text-gray-700">
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

        <div className='w-1/2  flex flex-col items-center ml-2 '>
          <label htmlFor="isRemote" className=" text-sm mx-2 font-medium text-gray-700">
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
        </div>
          <div className='flex flex-row items-baseline justify-center '>
        <div className='w-1/2 m-2'>
          <label htmlFor="startDate" className=" text-sm font-medium text-gray-700">
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

        <div className='w-1/2 '>
          <label htmlFor="endDate" className=" text-sm font-medium text-gray-700">
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
        </div>
        <div className='w-1/2'>
          <label htmlFor="internshipType" className=" text-sm font-medium text-gray-700">
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
            <option value="Unpaid">Un-Paid</option>
            {/* Add more options based on your requirements */}
          </select>
        </div>

        {formData.internshipType === 'Paid' && (
           <div className='w-1/2'>
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
         <div className='w-1/2'>
            <label htmlFor="noofVacancy" className="block text-sm font-medium text-gray-700">
              Number of Vacancies
            </label>
            <input
              type="number"
              id="noofVacancy"
              name="noofVacancy"
              onChange={handleChange}
              value={formData.noofVacancy}
              className="w-full"/>
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