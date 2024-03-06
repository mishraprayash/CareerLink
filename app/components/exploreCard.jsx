"use client";
import React, { useEffect, useState } from "react";
import "./styles/exploreCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";

import {
  faCoins,
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


import { useContext } from "react";
import { InternshipContext } from "../context/internshipcontext";

const exploreCard = ({ internship }) => {
  const router = useRouter();
  const { appliedInternships } = useContext(InternshipContext);
  const [isApplied, setIsApplied] = useState(false);
  const {
    applyforInternship,
    internshipApplyStatus,
    setInternshipApplyStatus,
  } = useContext(InternshipContext);

  useEffect(() => {
    setIsApplied(
      appliedInternships &&
        appliedInternships.some((applied) => applied._id === internship._id)
    );
  }, [appliedInternships]);

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
            {internship?.position}
          </p>
        </div>
        <div className="internship-name">
          <p>
            {internship?.companyLogo && (
              <img
                src={internship.companyLogo.secure_url}
                alt={internship.companyName}
                className="w-16 h-16  rounded-full"
                height={400}
                width={400}
              />
            )}
            {internship.companyName}
          </p>
        </div>
        <div className="internship-location">

          <p>
            {internship.location.toUpperCase()}
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
              <div className="sTitle">Location</div>
              <div className="sValue">{internship.location.toUpperCase()}</div>
            </div>
          </div>
          <div className="onesymbol">
            <div>
              <FontAwesomeIcon icon={faClock} size="2x" className=" Alogo " />
            </div>
            <div>
              <div className="sTitle">Time</div>
              <div className="sValue">{internship.workTime}</div>
            </div>
          </div>
          <div className="onesymbol">
            <div>
              <FontAwesomeIcon icon={faUser} size="2x" className=" Alogo " />
            </div>
            <div>
              <div className="sTitle">Openings</div>
              <div className="sValue text-center">{internship.noofVacancy}</div>
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
      </div>
      <div className="middle">
        <div className="flex flex-col gap-3">
          <p className="text-center text-[1.2rem] font-semibold">
            Required Qualifications
          </p>
          <p className="font-mono">
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
              {isApplied ? (
                <button disabled>Applied</button>
              ) : (
                <button
                  onClick={() => applyforInternship(internship._id.toString())}
                >
                  Apply
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default exploreCard;
