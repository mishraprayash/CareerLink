import React, { useState } from "react";

const allowedFileTypes = [
  "image/jpeg",
  "image/jpg",
  // "image/png",
  "application/pdf",
];

const Fileupload = () => {
  const [files, setFiles] = useState([]);

  const [companyInformation, setCompanyInformation] = useState({
    companyName: "",
    email: "",
    password: "",
    companyInfo: {
      category: "",
      industrySectors: "",
    },
    address: "",
  });

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) {
      console.log("file not uploaded successfully");
      return;
    }
    if (selectedFiles[0].size / 1000000 >= 1) {
      console.log("File size exceeded");
      return;
    }
    if (!allowedFileTypes.includes(selectedFiles[0].type)) {
      console.log("filetype not allowed");
    }
    setFiles((prevFiles) => [...prevFiles, ...Array.from(selectedFiles)]);
  };

  const removeFile = (index) => {
    setFiles((prevFiles) => {
      const updatedFiles = [...prevFiles];
      updatedFiles.splice(index, 1);
      return updatedFiles;
    });
  };

  const onSubmit = async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      formData.append("Registration", files[0]);
      formData.append("Logo", files[1]);
      console.log(files);
      formData.set("companyName", companyInformation.companyName);
      formData.set("email", companyInformation.email);
      formData.set("password", companyInformation.password);
      formData.set("category", companyInformation.companyInfo.category);
      formData.set(
        "industrySectors",
        companyInformation.companyInfo.industrySectors
      );
      formData.set("address", companyInformation.address);

      if (files.length < 2 || files.length > 3) {
        console.log("Please upload the only required files.");
        return;
      }
      const response = await fetch("/api/company/register", {
        method: "POST",
        body: formData,
      });
      console.log(response);

      if (!response.ok) {
        console.log("Error occured during files upload");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit} encType="multipart/form-data">
        <input
          type="text"
          name="companyName"
          onChange={(e) =>
            setCompanyInformation({
              ...companyInformation,
              companyName: e.target.value,
            })
          }
        />
        <input
          type="email"
          name="email"
          onChange={(e) =>
            setCompanyInformation({
              ...companyInformation,
              email: e.target.value,
            })
          }
        />
        <input
          type="password"
          name="password"
          onChange={(e) => {
            setCompanyInformation({
              ...companyInformation,
              password: e.target.value,
            });
          }}
        />
        <input
          type="text"
          name="category"
          onChange={(e) =>
            setCompanyInformation({
              ...companyInformation,
              companyInfo: {
                ...companyInformation.companyInfo,
                category: e.target.value,
              },
            })
          }
        />
        <input
          type="text"
          name="industrySectors"
          onChange={(e) => {
            setCompanyInformation({
              ...companyInformation,
              companyInfo: {
                ...companyInformation.companyInfo,
                indusrtySectors: e.target.value,
              },
            });
          }}
        />
        <input
          type="text"
          name="address"
          onChange={(e) => {
            setCompanyInformation({
              ...companyInformation,
              address: e.target.value,
            });
          }}
        />
        <input
          className="m-10"
          type="file"
          // name="Registration"
          onChange={handleFileChange}
          required
        />
        <input
          className="m-10"
          type="file"
          // name="Logo"
          onChange={handleFileChange}
          required
        />
        <div>
          {files &&
            files.map((file, index) => (
              <div key={index + 2}>
                {file.name}
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="m-5 bg-gray-300 cursor-pointer"
                >
                  Remove
                </button>
              </div>
            ))}
        </div>
        <button type="submit" className="bg-blue-400 rounded-lg px-3 py-2">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Fileupload;
