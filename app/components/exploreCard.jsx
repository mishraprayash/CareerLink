"use client";
import React, { useEffect } from "react";
import "./styles/exploreCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faSearchengin,
  faFigma,
} from "@fortawesome/free-brands-svg-icons";
import {
  faCoins,
  faEnvelope,
  faFilter,
  faSearch,
  fas,
  faLocationDot,
  faClock,
  faBriefcase,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import {
  faTwitter,
  faFontAwesome,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
library.add(
  fas,
  faTwitter,
  faFontAwesome,
  faFilter,
  faSearch,
  faLocationDot,
  faCoins,
  faBriefcase
);
import { useRouter } from "next/navigation";

{
  /* <FontAwesomeIcon  icon={faFilter}  className="  nine h-12 p-2  "/ >*/
}
import { useContext } from "react";
import { InternshipContext } from "../context/internshipcontext";

const exploreCard = ({ internship }) => {
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
    <div className="internship-card">
      <div className="top">
        <div className="internship-position">
          <p>
            {internship.position}
            {/* Software Developer */}
          </p>
        </div>
        <div className="internship-name">
          <p>
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
          </p>
        </div>
        <div className="internship-location">
          {/* <GoLocation className='hiring-icon'/>  */}
          <p>
            {internship.location}
            {/* Pokhara */}
          </p>
        </div>
        <div className="listOfSymbol">
          <div className="onesymbol">
            <div>
              {" "}
              <FontAwesomeIcon
                icon={faLocationDot}
                size="2x"
                className=" Alogo "
              />
            </div>
            <div>
              <div className="sTitle">location</div>
              <div className="sValue">{internship.location}</div>
            </div>
          </div>
          <div className="onesymbol">
            <div>
              <FontAwesomeIcon icon={faClock} size="2x" className=" Alogo " />
            </div>
            <div>
              <div className="sTitle">time</div>
              <div className="sValue">{internship.workTime}</div>
            </div>
          </div>
          <div className="onesymbol">
            <div>
              <FontAwesomeIcon icon={faUser} size="2x" className=" Alogo " />
            </div>
            <div>
              <div className="sTitle">Openings</div>
              <div className="sValue">{internship.noofVacancy}</div>
            </div>
          </div>
          <div className="onesymbol">
            <div className=" Alogo ">
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
          <p className="mx-[700px] text-lg font-semibold">
            Required Qualifications :{" "}
          </p>
          <p>
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
              internshop working{" "}
            </p>
          </div>
          <div className="internship-skills">
            {internship.skillsRequired &&
              internship.skillsRequired.length > 0 && (
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
            <div
              className="internship-bookmark "
              onClick={() => {
                router.push(`/explore/${internship._id}`);
              }}
            >
              View More
            </div>

            <div className="appy-btn">
              {/* <a href="/" target="_blank">
                Apply
                </a> */}
              <button
                onClick={() => applyforInternship(internship._id.toString())}
              >
                Apply
              </button>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default exploreCard;
