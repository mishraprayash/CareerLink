// import React, { useState } from 'react'
// import './InternshipCard.css'
// import { GoLocation }from "react-icons/go";
// import { BsBookmark, BsBookmarkFill, BsCalendar2Date }from "react-icons/bs";

// import Cookies from 'js-cookie'

// const InternshipCard = ({ internship }) => {
//     const [isBookmarked, setIsBookmarked] = useState(false);


//     async function bookmark() {
//         try {
//             let resp = await Axios.post(`$(process.env.REACT_APP_SERVER_URL)/user/bookmark`, {internship},{
//                 headers: {
//                     Authorization: "Bearer " + Cookies.get("token")
//                 }
//             })
//             if(resp.status === 200){
//                 // console.log(resp.data)
//                 setIsBookmarked(true);
//             }
//         } catch (err) {
//             console.log(err);
//         }
//     }

//     return (
//         <div className='internship-card'>
//             <div className="top">
//                 <div className="internship-position"><p>{internship.position}</p></div>
//                 <div className="internship-name"><p>{internship.company}</p></div>
//                 <div className="internship-location"><GoLocation className='hiring-icon'/> <p>{internship.location}</p></div>
//                 <div className="internship-start"><BsCalendar2Date className='hiring-icon'/>  Start Date : <p>{internship.start_date}</p></div>
//                 <div className="internship-end"><BsCalendar2Date className='hiring-icon'/>  End Date : <p>{internship.end_date}</p></div>
//             </div>
//             <div className="middle">
//                 <div className="internship-responsibility">
//                     <p>Day to Day Responsibilities : </p>
//                     <p>{internship.responsibilities}</p>
//                 </div>
//                 <div className="internship-qualification">
//                     <p>Required Qualifications : </p>
//                     <p>{internship.qualifications}</p>
//                 </div>
//             </div>
//             <div className="bottom">
//                 <div className="left">
//                     <div className="internship-compensation"><p>{internship.compensation}</p></div>
//                     <div className="internship-working"><p>{internship.working}</p></div>
//                 </div>
//                 <div className="right">
//                 <div className="internship-btn">
//                     <div className="internship-bookmark " onClick={() => bookmark()}>
//                         <div>
//                         {' '}
//                         {isBookmarked ? (
//                             <>
//                             <BsBookmarkFill className="internship-icon bookmark-icon" />{' '}
//                             </>
//                         ) : (
//                             <>
//                             <BsBookmark className="internship-icon bookmark-icon" />{' '}
//                             </>
//                         )}{' '}
//                         </div>
//                         <p>{isBookmarked ? 'Bookmarked' : 'Bookmark'}</p>
//                     </div>
//                     <div className="appy-btn">
//                         <a href="/" target="_blank">
//                         Apply
//                         </a>{' '}
//                     </div>
//                 </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default InternshipCard
"use client"
import React, { useEffect }  from 'react'
import './styles/exploreCard.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFacebook, faInstagram, faLinkedin, faSearchengin, faFigma } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faFilter, faSearch, fas } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faFontAwesome, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'
library.add(fas, faTwitter, faFontAwesome, faFilter, faSearch)
{/* <FontAwesomeIcon  icon={faFilter}  className="  nine h-12 p-2  "/ >*/ }
import { useContext } from 'react';
import { InternshipContext } from '../context/internshipcontext';

const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: 9999,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const messageBoxStyle = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '5px',
};

const InternshipCard = ({ internship }) => {
  // console.log(internship)
  const { applyforInternship, internshipApplyStatus,setInternshipApplyStatus } = useContext(InternshipContext)
  useEffect(() => {
    if (internshipApplyStatus) {
      const timeoutId = setTimeout(() => {
        setInternshipApplyStatus(null);
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [internshipApplyStatus]);

  return (
    <div className='main'>
      <div className='aCard'>
        <div className='left'>
          <div className='Clogo '>
            <img className="Alogo h-19 w-auto h-24" src={internship.companyLogo ? internship.companyLogo.secure_url : "/image/collaboration.jpg"} alt='clogo' /></div>
          <div className='cname'>Company: {internship.companyName}</div>
          <div className='cname'>Position: {internship.position}</div>
          <div className='cname'>location: {internship.location}</div>
          <div className='cname'>WorkTime: {internship.workTime}</div>
        </div>
        <div className='right '>
          <div> {internship.description}</div>
          <div className='cname'>Skills : {internship.skillsRequired}</div>
          <div>Starting Date:{internship.startDate}</div>
          <div> Ending Date:{internship.endDate}</div>
          <div> {internship.requirements}</div>
          <div> {internship.responsibilities}</div>
          <div> No of intern:{internship.noofVacancy}</div>
          <div className="flex justify-center space-x-4">
            <button onClick={() => applyforInternship(internship._id.toString())} className="bg-green-500 text-white px-4 py-2 rounded focus:outline-none focus:shadow-outline-blue active:bg-green-600">
              Apply
            </button>


            <button className="bg-green-500 text-white px-4 py-2 rounded focus:outline-none focus:shadow-outline-green active:bg-green-600">
              View more
            </button>
          </div>
        </div>
        {internshipApplyStatus && (
        <div style={overlayStyle}>
          <div style={messageBoxStyle}>
            {internshipApplyStatus}
          </div>
        </div>
      )}
      </div>
    </div>
  )
}

export default InternshipCard