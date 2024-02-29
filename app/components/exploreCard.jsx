// "use client"
// import React, { useEffect }  from 'react'
// import './styles/exploreCard.css'
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { faFacebook, faInstagram, faLinkedin, faSearchengin, faFigma } from "@fortawesome/free-brands-svg-icons";
// import { faEnvelope, faFilter, faSearch, fas } from '@fortawesome/free-solid-svg-icons'
// import { faTwitter, faFontAwesome, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'
// library.add(fas, faTwitter, faFontAwesome, faFilter, faSearch)
// {/* <FontAwesomeIcon  icon={faFilter}  className="  nine h-12 p-2  "/ >*/ }
// import { useContext } from 'react';
// import { InternshipContext } from '../context/internshipcontext';

// const overlayStyle = {
//   position: 'fixed',
//   top: 0,
//   left: 0,
//   width: '100%',
//   height: '100%',
//   backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   zIndex: 9999,
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
// };

// const messageBoxStyle = {
//   backgroundColor: 'white',
//   padding: '20px',
//   borderRadius: '5px',
// };

// const exploreCard = ({ internship }) => {
//   // console.log(internship)
//   const { applyforInternship, internshipApplyStatus,setInternshipApplyStatus } = useContext(InternshipContext)
//   useEffect(() => {
//     if (internshipApplyStatus) {
//       const timeoutId = setTimeout(() => {
//         setInternshipApplyStatus(null);
//       }, 2000);

//       return () => clearTimeout(timeoutId);
//     }
//   }, [internshipApplyStatus]);

//   return (
//     <div className='main'>
//       <div className='aCard'>
//         <div className='left'>
//           <div className='Clogo '>
//             <img className="Alogo h-19 w-auto h-24" src={internship.companyLogo ? internship.companyLogo.secure_url : "/image/collaboration.jpg"} alt='clogo' /></div>
//           <div className='cname'>Company: {internship.companyName}</div>
//           <div className='cname'>Position: {internship.position}</div>
//           <div className='cname'>location: {internship.location}</div>
//           <div className='cname'>WorkTime: {internship.workTime}</div>
//         </div>
//         <div className='right '>
//           <div> {internship.description}</div>
//           <div className='cname'>Skills : {internship.skillsRequired}</div>
//           <div>Starting Date:{internship.startDate}</div>
//           <div> Ending Date:{internship.endDate}</div>
//           <div> {internship.requirements}</div>
//           <div> {internship.responsibilities}</div>
//           <div> No of intern:{internship.noofVacancy}</div>
//           <div className="flex justify-center space-x-4">
//             <button onClick={() => applyforInternship(internship._id.toString())} className="bg-green-500 text-white px-4 py-2 rounded focus:outline-none focus:shadow-outline-blue active:bg-green-600">
//               Apply
//             </button>


//             <button className="bg-green-500 text-white px-4 py-2 rounded focus:outline-none focus:shadow-outline-green active:bg-green-600">
//               View more
//             </button>
//           </div>
//         </div>
//         {internshipApplyStatus && (
//         <div style={overlayStyle}>
//           <div style={messageBoxStyle}>
//             {internshipApplyStatus}
//           </div>
//         </div>
//       )}
//       </div>
//     </div>
//   )
// }

// export default exploreCard


"use client"
import React, { useEffect } from 'react'
import './styles/exploreCard.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFacebook, faInstagram, faLinkedin, faSearchengin, faFigma } from "@fortawesome/free-brands-svg-icons";
import { faCoins, faEnvelope, faFilter, faSearch, fas, faLocationDot, faClock, faBriefcase,faUser } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faFontAwesome, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'
library.add(fas, faTwitter, faFontAwesome, faFilter, faSearch, faLocationDot, faCoins, faBriefcase)
import { useRouter } from 'next/navigation';


{/* <FontAwesomeIcon  icon={faFilter}  className="  nine h-12 p-2  "/ >*/ }
import { useContext } from 'react';
import { InternshipContext } from '../context/internshipcontext';


const exploreCard = ({ internship }) => {

  const router=useRouter()
  const { applyforInternship, internshipApplyStatus, setInternshipApplyStatus } = useContext(InternshipContext)
  useEffect(() => {
    if (internshipApplyStatus) {
      const timeoutId = setTimeout(() => {
        setInternshipApplyStatus(null);
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [internshipApplyStatus]);

  return (

    <div className='internship-card'>
    <div className="top">
        <div className="internship-position"><p>
          {internship.position}
          {/* Software Developer */}
          </p></div>
        <div className="internship-name"><p>
          {internship?.companyLogo && (
            <img
              src={internship.companyLogo.secure_url}
              alt={internship.companyName}
              className="w-16 h-16  rounded-2xl"
              height={400}
              width={400}
            />
          )}
          {internship.companyName}
        </p></div> 
        <div className="internship-location">
          {/* <GoLocation className='hiring-icon'/>  */}
        <p>
          {internship.location}
         {/* Pokhara */}
          </p>
        </div>
        <div className="listOfSymbol">
          <div className='onesymbol'>
            <div> <FontAwesomeIcon icon={faLocationDot} size="2x" className=" Alogo " />
            </div>
            <div>
              <div className="sTitle">location</div>
              <div className="sValue">{internship.location}</div>
            </div>
        </div>
        <div className='onesymbol'>
            <div>
              <FontAwesomeIcon icon={faClock} size="2x" className=" Alogo " />
            </div>
            <div>
              <div className="sTitle">time</div>
              <div className="sValue">{internship.workTime}</div>
            </div>
          </div>
          <div className='onesymbol'>
            <div>
              <FontAwesomeIcon icon={faUser} size="2x" className=" Alogo " />
            </div>
            <div>
              <div className="sTitle">Openings</div>
              <div className="sValue">{internship.noofVacancy}</div>
            </div>
          </div>
          <div className='onesymbol'>
            <div className=" Alogo " >
              <FontAwesomeIcon icon={faCoins} size="2x" className=" Alogo " />
            </div>
            <div>
              <div className="sTitle">Salary</div>
              <div className="sValue">{internship.salary} per Month</div>
            </div>
          </div>


     </div>




        {/* <div className="internship-start">
          <BsCalendar2Date className='hiring-icon'/> 
           Start Date : <p>
          {internship.start_date}
          2080-01-25
          </p></div>
        <div className="internship-end">
          <BsCalendar2Date className='hiring-icon'/> 
           End Date : <p>
          {internship.end_date}
          2080-01-25
          </p></div> */}
    </div>
    <div className="middle">
        {/* <div className="internship-responsibility">
            <p>Day to Day Responsibilities : </p>
            <p>
              
               {internship.responsibilities} 
              internship responsibilities
              </p>
        </div> */}
        <div className="internship-qualification">
            <p className='mx-[700px] text-lg font-semibold'>Required Qualifications : </p>
            <p >
              {/* {internship.qualifications} */}
              {internship.requirements}
              </p>
        </div>
      </div>
      <div className="bottom">
        <div className="left">
          <div className="internship-compensation">
            <p>
              {/* {internship.compensation} */}
              view about company
            </p>
          </div>
          <div className="internship-working">
            <p>
              {/* {internship.working} */}
              internshop working  </p >
          </div>
          <div className="internship-skills">
  {internship.skillsRequired && internship.skillsRequired.length > 0 && (
    <>
      <p className="font-semibold">Skills Required:</p>
      <ul className="list-disc pl-4">
        {/* Iterate over skills required and display them */}
        {internship.skillsRequired.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
    </>
  )}
</div>

        </div>
        <div className="right">
        <div className="internship-btn">

        <div className="internship-bookmark " onClick={()=>{
         
         router.push(`/explore/${internship._id}`)
       }}>
         View More
       </div>


            <div className="appy-btn">
              {/* <a href="/" target="_blank">
                Apply
                </a> */}
                
                  <button onClick={() => applyforInternship(internship._id.toString())} >
               Apply
           </button>
                
                {' '}
            </div>
          </div>
        </div>
      
      </div>
    </div>

  )
}

export default exploreCard