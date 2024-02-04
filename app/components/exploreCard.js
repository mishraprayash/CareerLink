"use client"
import React from 'react'
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

const exploreCard = ({ internship }) => {
  // console.log(internship)
  const { applyforInternship, internshipApplyStatus } = useContext(InternshipContext)

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
        {
          internshipApplyStatus ? (window.alert(internshipApplyStatus)) : null
        }
      </div>
    </div>
  )
}

export default exploreCard
