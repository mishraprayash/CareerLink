// 'use client'

// import React, { useState } from 'react';

// const StudentForm = () => {
//   const apiUrl=`http://localhost:3000/api/student/updateprofile`
//   const [formData, setFormData] = useState({
//     name: '',
//     profilePicture: null,
//     cv: null,
//     certificates: [],
//     verified: false,
//     gender: '',
//     age: null,
//     about: '',
//     bio: '',
//     state: '',
//     district: '',
//     street: '',
//     socialmedia: [ { type: 'linkedin', link: '' }],
//   });

//   const handleChange = (e) => {
//     const { name, type, files } = e.target;

//     if (type === 'file') {
//       if (e.target.multiple) {
//         // Handle multiple files
//         setFormData({
//           ...formData,
//           [name]: [...(formData[name] || []), ...Array.from(files).filter(file => file)],
//         });
//       } else {
//         // Handle single file
//         setFormData({ ...formData, [name]: files[0] });
//       }
//     } else {
//       // Handle other input types
//       setFormData({ ...formData, [name]: e.target.value });
//     }
//   };




//   const handleSocialMediaChange = (index, e) => {
//     const { name, value } = e.target;

//     // Create a copy of the existing formData
//     const updatedSocialMedia = [...formData.socialmedia];

//     // Create a copy of the current item or initialize it if not present
//     updatedSocialMedia[index] = { ...(updatedSocialMedia[index] || {}), [name]: value };

//     // Update the formData with the updated array
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       socialmedia: updatedSocialMedia,
//     }));
//   };

//   const handleAddSocialMedia = () => {
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       socialmedia: [...prevFormData.socialmedia, { type: 'linkedin', link: '' }],
//     }));
//   };


//   const handleSubmit = async (e) => {
//     e.preventDefault();

// console.log(formData.socialmedia)
//     // Convert the form data to FormData
//   const formDataToSend = new FormData();

//   // Append each key-value pair to the FormData object
//   for (const key in formData) {
//     if (key === 'socialmedia') {
//       const socialMediaArray = formData.socialmedia.map(social => ({
//         type: social.type,
//         link: social.link,
//       }));

//       formDataToSend.append('socialmedia', JSON.stringify(socialMediaArray));


//     }else if (key === 'profilePicture' || key === 'cv' || key === 'certificates') {
//       // Handle files (profilePicture, cv, certificates)
//       if (Array.isArray(formData[key])) {
//         console.log(key)
//         formData[key].forEach((file, index) => {
//           formDataToSend.append(key, file);
//         });
//       } else {
//         formDataToSend.append(key, formData[key]);
//       }
//       }else {
//       formDataToSend.append(key, formData[key]);
//     }
//   }
//   console.log(formDataToSend.getAll('socialmedia'))

//     try {
//       const response = await fetch(apiUrl,{
//         method:'POST',
//         body:formDataToSend
//       });
//       const data=await response.json()
//       console.log(data)
//       console.log(data.error);
//       window.alert(data.msg)

//     } catch (error) {
//       console.error('Error submitting form:', error);
//     }
//   };

//   return (
//     <form className="max-w-md mx-auto my-8 p-6 bg-white rounded shadow-md">
//       <label className="block mb-2 text-sm font-bold text-gray-600">Name</label>
//       <input
//         type="text"
//         name="name"
//         value={formData.name}
//         onChange={handleChange}
//         className="w-full p-2 border rounded"
//       />

//       <label className="block mt-4 mb-2 text-sm font-bold text-gray-600">Profile Picture</label>
//       <input type="file" name="profilePicture" onChange={handleChange} className="w-full p-2 border rounded" />

//       <label className="block mt-4 mb-2 text-sm font-bold text-gray-600">CV</label>
//       <input type="file" name="cv" onChange={handleChange} className="w-full p-2 border rounded" />

//       <label className="block mt-4 mb-2 text-sm font-bold text-gray-600">Certificates</label>
//       <input type="file" name="certificates" onChange={handleChange} multiple className="w-full p-2 border rounded" />

//       <label className="block mt-4 mb-2 text-sm font-bold text-gray-600">Gender</label>
//       <select
//         name="gender"
//         value={formData.gender}
//         onChange={handleChange}
//         className="w-full p-2 border rounded"
//       >
//         <option value="">Select Gender</option>
//         <option value="Male">Male</option>
//         <option value="Female">Female</option>
//       </select>

//       <label className="block mt-4 mb-2 text-sm font-bold text-gray-600">Age</label>
//       <input
//         type="number"
//         name="age"
//         value={formData.age}
//         onChange={handleChange}
//         className="w-full p-2 border rounded"
//       />

//       <label className="block mt-4 mb-2 text-sm font-bold text-gray-600">About</label>
//       <textarea
//         name="about"
//         value={formData.about}
//         onChange={handleChange}
//         className="w-full p-2 border rounded"
//       ></textarea>

//       <label className="block mt-4 mb-2 text-sm font-bold text-gray-600">Bio</label>
//       <textarea
//   name="bio"
//   value={formData.bio}
//   onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
//   className="w-full p-2 border rounded"
// ></textarea>


//       <label className="block mt-4 mb-2 text-sm font-bold text-gray-600">Address</label>
//       <div className="grid grid-cols-3 gap-4">
//       <input
//   type="text"
//   name="state"
//   value={formData.state}
//   onChange={handleChange}
//   placeholder="State"
//   className="w-full p-2 border rounded"
// />

//         <input
//           type="text"
//           name="district"
//           value={formData.district}
//           onChange={handleChange}
//           placeholder="District"
//           className="w-full p-2 border rounded"
//         />
//         <input
//           type="text"
//           name="street"
//           value={formData.street}
//           onChange={handleChange}
//           placeholder="Street"
//           className="w-full p-2 border rounded"
//         />
//       </div>


//       <label className="block mt-4 mb-2 text-sm font-bold text-gray-600">Social Media</label>
//       {formData.socialmedia.map((social, index) => (
//         <div key={index} className="grid grid-cols-2 gap-4">
//           <select
//             name={`type`}
//             value={social.type}
//             onChange={(e) => handleSocialMediaChange(index, e)}
//             className="w-full p-2 border rounded"
//           >
//             <option value="linkedin">LinkedIn</option>
//             <option value="github">GitHub</option>
//             <option value="other">Other</option>
//           </select>
//           <input
//             type="text"
//             name={`link`}
//             value={social.link}
//             onChange={(e) => handleSocialMediaChange(index, e)}
//             placeholder="Profile Link"
//             className="w-full p-2 border rounded"
//           />
//         </div>
//       ))}
//       <button
//         type="button"
//         onClick={handleAddSocialMedia}
//         className="mt-2 bg-blue-500 text-white p-2 rounded"
//       >
//         Add Social Media
//       </button>

//       <button type="submit" onClick={handleSubmit} className="mt-4 bg-blue-500 text-white p-2 rounded">
//         Submit
//       </button>
//     </form>
//   );
// };

// export default StudentForm;

'use client'

import { ToastMessage } from '@/app/components/ToastMessage';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const StudentForm = () => {
  const router = useRouter()
  const apiUrl = `http://localhost:3000/api/student/updateprofile`
  const [formData, setFormData] = useState({
    name: '',
    profilePicture: null,
    cv: null,
    certificates: [],
    verified: false,
    gender: '',
    age: null,
    about: '',
    bio: '',
    state: '',
    district: '',
    street: '',
    socialmedia: [{ type: 'linkedin', link: '' }],
  });

  const handleChange = (e) => {
    const { name, type, files } = e.target;

    if (type === 'file') {
      if (e.target.multiple) {
        // Handle multiple files
        setFormData({
          ...formData,
          [name]: [...(formData[name] || []), ...Array.from(files).filter(file => file)],
        });
      } else {
        // Handle single file
        setFormData({ ...formData, [name]: files[0] });
      }
    } else {
      // Handle other input types
      setFormData({ ...formData, [name]: e.target.value });
    }
  };




  const handleSocialMediaChange = (index, e) => {
    const { name, value } = e.target;

    // Create a copy of the existing formData
    const updatedSocialMedia = [...formData.socialmedia];

    // Create a copy of the current item or initialize it if not present
    updatedSocialMedia[index] = { ...(updatedSocialMedia[index] || {}), [name]: value };

    // Update the formData with the updated array
    setFormData((prevFormData) => ({
      ...prevFormData,
      socialmedia: updatedSocialMedia,
    }));
  };

  const handleAddSocialMedia = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      socialmedia: [...prevFormData.socialmedia, { type: 'linkedin', link: '' }],
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData.socialmedia)
    // Convert the form data to FormData
    const formDataToSend = new FormData();

    // Append each key-value pair to the FormData object
    for (const key in formData) {
      if (key === 'socialmedia') {
        const socialMediaArray = formData.socialmedia.map(social => ({
          type: social.type,
          link: social.link,
        }));

        formDataToSend.append('socialmedia', JSON.stringify(socialMediaArray));


      } else if (key === 'profilePicture' || key === 'cv' || key === 'certificates') {
        // Handle files (profilePicture, cv, certificates)
        if (Array.isArray(formData[key])) {
          console.log(key)
          formData[key].forEach((file, index) => {
            formDataToSend.append(key, file);
          });
        } else {
          formDataToSend.append(key, formData[key]);
        }
      } else {
        formDataToSend.append(key, formData[key]);
      }
    }
    console.log(formDataToSend.getAll('socialmedia'))

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formDataToSend
      });
      const data = await response.json()
      console.log(data)
      if (!response.ok) {
        ToastMessage("Warning", data.msg)
      } else {

        router.push('/dashboard/components/profile');
        ToastMessage("Success", data.msg)
      }
      console.log(data.error);
      // window.alert(data.msg)

    } catch (error) {
      console.error('Error submitting form:', error);
      ToastMessage("Error", error)
    }
  };

  return (
    <div className="form-group">

      <div className='font-semibold text-5xl mb-10 font-mono text-center mt-4'>UPDATE PROFILE</div>
      <form className=" mx-10 my-8 px-20 py-10 bg-white rounded shadow-neutral-800 border-4 text-lg">
        <div className='text-2xl text-center mb-12'>Fill out your primary information.</div>
        <div className='flex'>

          <div className='w-1/3'>
            <label className="block mb-2 text-xl font-bold text-gray-600">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3  border rounded"
            />
            <label className="block mt-8 mb-2  text-xl font-bold text-gray-600">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <label className="block mt-8 mb-2  text-xl font-bold text-gray-600">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />

            <label className="block mt-8 mb-2  text-xl font-bold text-gray-600">Address</label>
            <div className="grid grid-cols-3 gap-4">
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="State"
                className="w-full p-2 border rounded"
              />

              <input
                type="text"
                name="district"
                value={formData.district}
                onChange={handleChange}
                placeholder="District"
                className="w-full p-3 border rounded"
              />
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleChange}
                placeholder="Street"
                className="w-full p-3 border rounded"
              />
            </div>
          </div>
          <div className='w-2/3 px-12'>
            <label className="block mt-8 mb-2  text-xl font-bold text-gray-600">About</label>
            <textarea
              name="about"
              value={formData.about}
              onChange={handleChange}
              className="w-full p-2 border rounded h-56"
            ></textarea>

            <label className="block mt-8 mb-2  text-xl font-bold text-gray-600">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full p-2 border rounded h-28"
            ></textarea>

          </div>

        </div>
        <div className='flex justify-end'>

          <button type="submit" onClick={handleSubmit} className="
      mt-8 max-w-4xl text-2xl block bg-blue-500 text-white p-2 rounded transition:1s hover:bg-pink-400 hover:-translate-y-1 hover:scale-110 duration-500 
      ">
            Submit
          </button>
        </div>
      </form>
      <form className=" mx-10 my-8 px-20 py-10 bg-white rounded shadow-neutral-800 border-4 text-lg">
        <div>

          <label className="block mt-10 mb-2  text-xl font-bold text-gray-600">Profile Picture</label>
          <input type="file" name="profilePicture" onChange={handleChange} className="w-full p-3 border rounded" />
        </div>
        <div className='flex justify-end'>

          <button type="submit" onClick={handleSubmit} className="
mt-8 max-w-4xl text-2xl block bg-blue-500 text-white p-2 rounded transition:1s hover:bg-pink-400 hover:-translate-y-1 hover:scale-110 duration-500 
">
            Submit
          </button>
        </div>
      </form>
      <form className=" mx-10 my-8 px-20 py-10 bg-white rounded shadow-neutral-800 border-4 text-lg">
        <div>
          <label className="block mt-10 mb-2  text-xl font-bold text-gray-600">CV</label>
          <input type="file" name="cv" onChange={handleChange} className="w-full p-2 border rounded" />
        </div>
        <div className='flex justify-end'>

          <button type="submit" onClick={handleSubmit} className="
mt-8 max-w-4xl text-2xl block bg-blue-500 text-white p-2 rounded transition:1s hover:bg-pink-400 hover:-translate-y-1 hover:scale-110 duration-500 
">
            Submit
          </button>
        </div>
      </form>
      <form className=" mx-10 my-8 px-20 py-10 bg-white rounded shadow-neutral-800 border-4 text-lg">
        <div>
          <label className="block mt-10 mb-2 text-xl font-bold text-gray-600">Certificates</label>
          <input type="file" name="certificates" onChange={handleChange} multiple className="w-full p-3 border rounded" />
        </div>
        <div className='flex justify-end'>

          <button type="submit" onClick={handleSubmit} className="
mt-8 max-w-4xl text-2xl block bg-blue-500 text-white p-2 rounded transition:1s hover:bg-pink-400 hover:-translate-y-1 hover:scale-110 duration-500 
">
            Submit
          </button>
        </div>
      </form>

      <form className=" mx-10 my-8 px-20 py-10 bg-white rounded shadow-neutral-800 border-4 text-lg">
        <div className='text-4xl text-center mb-12'>Social Links</div>
        <div>

          <label className="block mt-10 mb-2 text-xl font-bold text-gray-600">Social Media</label>
          {formData.socialmedia.map((social, index) => (
            <div key={index} className="grid grid-cols-2 gap-4">
              <select
                name={`type`}
                value={social.type}
                onChange={(e) => handleSocialMediaChange(index, e)}
                className="w-full p-3 border rounded"
              >
                <option value="linkedin">LinkedIn</option>
                <option value="github">GitHub</option>
                <option value="other">Other</option>
              </select>
              <input
                type="text"
                name={`link`}
                value={social.link}
                onChange={(e) => handleSocialMediaChange(index, e)}
                placeholder="Profile Link"
                className="w-full p-3 border rounded"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddSocialMedia}
            className="mt-2 bg-blue-500 text-white p-2 rounded"
          >
            Add Social Media
          </button>
        </div>
        <div className='flex justify-end'>

          <button type="submit" onClick={handleSubmit} className="
mt-8 max-w-4xl text-2xl block bg-blue-500 text-white p-2 rounded transition:1s hover:bg-pink-400 hover:-translate-y-1 hover:scale-110 duration-500 
">
            Submit
          </button>
        </div>

      </form>

      <form className=" mx-10 my-8 px-20 py-10 bg-white rounded shadow-neutral-800 border-4 text-lg">
        <div className='text-3xl text-center'>Education</div>
        <p className='text-center'>Give a detailed look into your academic history.</p>
        <div>
        <label htmlFor="campus" className="block mt-4 mb-2 text-xl font-bold text-gray-600">School/Institution</label>
        <input type="text" id="campus" name="campus" value={formData.campus} onChange={handleChange} className="w-full p-3 border rounded" required />
      </div>
      <div>
        <label htmlFor="degree" className="block mb-2 text-xl font-bold text-gray-600">Degree</label>
        <select id="degree" name="degree" value={formData.degree} onChange={handleChange} className="w-full p-3 border rounded" required>
          <option value="">Select Degree</option>
          <option value="Bachelor of Engineering">Bachelor of Engineering</option>
        </select>
      </div>
      <div>
        <label htmlFor="faculty" className="block mt-4 mb-2 text-xl font-bold text-gray-600">Faculty</label>
        <select id="faculty" name="faculty" value={formData.faculty} onChange={handleChange} className="w-full p-3 border rounded" required>
          <option value="">Select Faculty</option>
          <option value="ENG">BCE</option>
          <option value="ENG">BCT</option>
          <option value="ENG">BGE</option>
          <option value="ENG">BME</option>
          <option value="ENG">BEI</option>
          <option value="ENG">BEE</option>
          <option value="ENG">BAE</option>
        </select>
      </div>

      <div>
        <label htmlFor="year" className="block mt-4 mb-2 text-xl font-bold text-gray-600">Year of Graduation</label>
        <input type="number" id="year" name="year" value={formData.year} onChange={handleChange} className="w-full p-3 border rounded" required />
      </div>
      <div className='flex justify-end'>

<button type="submit"  className="
mt-8 max-w-4xl text-2xl block bg-blue-500 text-white p-2 rounded transition:1s hover:bg-pink-400 hover:-translate-y-1 hover:scale-110 duration-500 
">
  Submit
</button>
</div>
    </form>

    </div>
  );
};

export default StudentForm;