// "use client";
// import React, { useEffect } from "react";
// import "./styles/exploreCard.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { library } from "@fortawesome/fontawesome-svg-core";
// import {
//   faFacebook,
//   faInstagram,
//   faLinkedin,
//   faSearchengin,
//   faFigma,
// } from "@fortawesome/free-brands-svg-icons";
// import {
//   faCoins,
//   faEnvelope,
//   faFilter,
//   faSearch,
//   fas,
//   faLocationDot,
//   faClock,
//   faBriefcase,
//   faUser,
// } from "@fortawesome/free-solid-svg-icons";
// import {
//   faTwitter,
//   faFontAwesome,
//   faLinkedinIn,
// } from "@fortawesome/free-brands-svg-icons";
// library.add(
//   fas,
//   faTwitter,
//   faFontAwesome,
//   faFilter,
//   faSearch,
//   faLocationDot,
//   faCoins,
//   faBriefcase
// );
// import { useRouter } from "next/navigation";

// {
//   /* <FontAwesomeIcon  icon={faFilter}  className="  nine h-12 p-2  "/ >*/
// }
// import { useContext } from "react";
// import { InternshipContext } from "../context/internshipcontext";

// const exploreCard = ({ internship }) => {
//   const router = useRouter();
//   const {
//     applyforInternship,
//     internshipApplyStatus,
//     setInternshipApplyStatus,
//   } = useContext(InternshipContext);
//   useEffect(() => {
//     if (internshipApplyStatus) {
//       const timeoutId = setTimeout(() => {
//         setInternshipApplyStatus(null);
//       }, 2000);

//       return () => clearTimeout(timeoutId);
//     }
//   }, [internshipApplyStatus]);

//   return (
//     <div className="internship-card">
//       <div className="top">
//         <div className="internship-position">
//           <p>
//             {internship.position}
//             {/* Software Developer */}
//           </p>
//         </div>
//         <div className="internship-name">
//           <p>
//             {internship?.companyLogo && (
//               <img
//                 src={internship.companyLogo.secure_url}
//                 alt={internship.companyName}
//                 className="w-16 h-16  rounded-2xl"
//                 height={400}
//                 width={400}
//               />
//             )}
//             {internship.companyName}
//           </p>
//         </div>
//         <div className="internship-location">
//           {/* <GoLocation className='hiring-icon'/>  */}
//           <p>
//             {internship.location}
//             {/* Pokhara */}
//           </p>
//         </div>
//         <div className="listOfSymbol">
//           <div className="onesymbol">
//             <div>
//               {" "}
//               <FontAwesomeIcon
//                 icon={faLocationDot}
//                 size="2x"
//                 className=" Alogo "
//               />
//             </div>
//             <div>
//               <div className="sTitle">location</div>
//               <div className="sValue">{internship.location}</div>
//             </div>
//           </div>
//           <div className="onesymbol">
//             <div>
//               <FontAwesomeIcon icon={faClock} size="2x" className=" Alogo " />
//             </div>
//             <div>
//               <div className="sTitle">time</div>
//               <div className="sValue">{internship.workTime}</div>
//             </div>
//           </div>
//           <div className="onesymbol">
//             <div>
//               <FontAwesomeIcon icon={faUser} size="2x" className=" Alogo " />
//             </div>
//             <div>
//               <div className="sTitle">Openings</div>
//               <div className="sValue">{internship.noofVacancy}</div>
//             </div>
//           </div>
//           <div className="onesymbol">
//             <div className=" Alogo ">
//               <FontAwesomeIcon icon={faCoins} size="2x" className=" Alogo " />
//             </div>
//             <div>
//               <div className="sTitle">Salary</div>
//               <div className="sValue">{internship.salary} per Month</div>
//             </div>
//           </div>
//         </div>

//         {/* <div className="internship-start">
//           <BsCalendar2Date className='hiring-icon'/>
//            Start Date : <p>
//           {internship.start_date}
//           2080-01-25
//           </p></div>
//         <div className="internship-end">
//           <BsCalendar2Date className='hiring-icon'/>
//            End Date : <p>
//           {internship.end_date}
//           2080-01-25
//           </p></div> */}
//       </div>
//       <div className="middle">
//         {/* <div className="internship-responsibility">
//             <p>Day to Day Responsibilities : </p>
//             <p>

//                {internship.responsibilities}
//               internship responsibilities
//               </p>
//         </div> */}
//         <div className="internship-qualification">
//           <p className="mx-[700px] text-lg font-semibold">
//             Required Qualifications :{" "}
//           </p>
//           <p>
//             {/* {internship.qualifications} */}
//             {internship.requirements}
//           </p>
//         </div>
//       </div>
//       <div className="bottom">
//         <div className="left">
//           <div className="internship-compensation">
//             <p>
//               {/* {internship.compensation} */}
//               view about company
//             </p>
//           </div>
//           <div className="internship-working">
//             <p>
//               {/* {internship.working} */}
//               internshop working{" "}
//             </p>
//           </div>
//           <div className="internship-skills">
//             {internship.skillsRequired &&
//               internship.skillsRequired.length > 0 && (
//                 <>
//                   <p className="font-semibold">Skills Required:</p>
//                   <ul className="list-disc pl-4">
//                     {/* Iterate over skills required and display them */}
//                     {internship.skillsRequired.map((skill, index) => (
//                       <li key={index}>{skill}</li>
//                     ))}
//                   </ul>
//                 </>
//               )}
//           </div>
//         </div>
//         <div className="right">
//           <div className="internship-btn">
//             <div
//               className="internship-bookmark "
//               onClick={() => {
//                 router.push(`/explore/${internship._id}`);
//               }}
//             >
//               View More
//             </div>

//             <div className="appy-btn">
//               {/* <a href="/" target="_blank">
//                 Apply
//                 </a> */}
//               <button
//                 onClick={() => applyforInternship(internship._id.toString())}
//               >
//                 Apply
//               </button>{" "}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default exploreCard;

"use client";

import React, { useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faClock,
  faUser,
  faCoins,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { InternshipContext } from "../context/internshipcontext";

const ExploreCard = ({ internship }) => {
  const router = useRouter();
  const {
    applyforInternship,
    internshipApplyStatus,
    setInternshipApplyStatus,
  } = useContext(InternshipContext);

  useEffect(() => {
    if (internshipApplyStatus) {
      const timeoutId = setTimeout(() => {
        setInternshipApplyStatus(null);
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [internshipApplyStatus]);

  return (
    <div className="bg-[rgba(241,241,241,0.8)] shadow-sm rounded-lg overflow-hidden shadow-black">
      <div className="p-6 flex items-center justify-between">
        <div className="flex gap-2 w-full justify-center">
          <div>
            {internship.companyLogo && (
              <img
                src={internship.companyLogo.secure_url}
                alt={internship.companyName}
                className="w-16 h-16 rounded-full border-2 border-red-300"
              />
            )}
          </div>
          <div className="ml-5">
            <div className="text-xl font-bold">{internship.position.toUpperCase()}</div>
            <div className="text-gray-500">{internship.companyName}</div>
            <div className="text-gray-500">{internship.location.toUpperCase()}</div>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="flex justify-between mb-4">
          <div className="flex items-center">
            <FontAwesomeIcon
              icon={faLocationDot}
              size="lg"
              className="text-black mr-2"
            />
            <div>
              <div className="text-sm font-semibold">Location</div>
              <div className="text-gray-500">{internship.location.toUpperCase()}</div>
            </div>
          </div>
          <div className="flex items-center">
            <FontAwesomeIcon
              icon={faClock}
              size="lg"
              className="text-black mr-2"
            />
            <div>
              <div className="text-sm font-semibold">Time</div>
              <div className="text-black">{internship.workTime}</div>
            </div>
          </div>
          <div className="flex items-center">
            <FontAwesomeIcon
              icon={faUser}
              size="lg"
              className="text-black mr-2"
            />
            <div>
              <div className="text-sm font-semibold">Openings</div>
              <div className="text-black text-center">{internship.noofVacancy}</div>
            </div>
          </div>
          <div className="flex items-center">
            <FontAwesomeIcon
              icon={faCoins}
              size="lg"
              className="text-black mr-2"
            />
            <div>
              <div className="text-sm font-semibold">Salary</div>
              <div className="text-gray-500">{internship.salary} per Month</div>
            </div>
          </div>
        </div>
        <div>
          <div className="text-[1.2rem] font-semibold text-center">Required Qualifications</div>
          <div className="p-3 m-2 font-mono font-semibold">{internship.requirements}</div>
        </div>
      </div>
      <div className="p-6 flex justify-center">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4"
          onClick={() => router.push(`/explore/${internship._id}`)}
        >
          View More
        </button>
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={() => applyforInternship(internship._id.toString())}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default ExploreCard;
