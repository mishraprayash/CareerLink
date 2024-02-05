"use client";
import React from 'react'
import './styles/exploreCard.css';


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFacebook,  faInstagram, faLinkedin , faSearchengin,faFigma} from "@fortawesome/free-brands-svg-icons";
import { faCoins, faEnvelope, faFilter, faSearch, fas,faLocationDot , faClock, faBriefcase} from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faFontAwesome, faLinkedinIn} from '@fortawesome/free-brands-svg-icons'
library.add(fas, faTwitter, faFontAwesome, faFilter,faSearch,faLocationDot,faCoins,faBriefcase)





const exploreCard = () => {
  return (
    <div className='internship-card'>
    <div className="top">
        <div className="internship-position"><p>
          {/* {internship.position} */}
          Software Developer
          </p></div>
        <div className="internship-name"><p>
          {/* {internship.company} */}
          Yamini Engineering Consuntancy
        </p></div>
        <div className="internship-location">
          {/* <GoLocation className='hiring-icon'/>  */}
        <p>
          {/* {internship.location} */}
         Pokhara
          </p>
          </div>
          <div className="listOfSymbol">                                                     
        <div className='onesymbol'>
            <div> <FontAwesomeIcon icon={faLocationDot}  size="2x"className=" Alogo " />
            {/* <img className="Alogo " src="collaboration.jpg" height="45px" width="45px" alt='comlogo'/> */}
            </div>
            <div>
                <div className="sTitle">location</div>
                <div className="sValue">pokhara</div>
            </div>
        </div>
        <div className='onesymbol'>
            <div>
            <FontAwesomeIcon icon={faClock}  size="2x" className=" Alogo " />
            </div>
            <div>
                <div className="sTitle">time</div>
                <div className="sValue">10-4</div>
            </div>
        </div>
        <div className='onesymbol'>
            <div>
            <FontAwesomeIcon icon={faBriefcase}   size="2x" className=" Alogo " />
            </div>
            <div>
                <div className="sTitle">position</div>
                <div className="sValue">junior developer</div>
            </div>
        </div>
        <div className='onesymbol'>
            <div className=" Alogo " > 
                <FontAwesomeIcon icon={faCoins} size="2x" className=" Alogo " />
            </div>
            <div>
                <div className="sTitle">salary</div>
                <div className="sValue">$100 per week</div>
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
            <p>Required Qualifications : </p>
            <p>
              {/* {internship.qualifications} */}
              internship Qualifications
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
        </div>
        <div className="right">
        <div className="internship-btn">
            <div className="internship-bookmark " onClick={() => bookmark()}>
                <div>
                {' '}view detail
                {/* {isBookmarked ? (
                    <>
                    <BsBookmarkFill className="internship-icon bookmark-icon" />{' '}
                    </>
                ) : (
                    <>
                    <BsBookmark className="internship-icon bookmark-icon" />{' '}
                    </>
                )} */}
                {' '}
                </div>
                <p>
                  {/* {isBookmarked ? 'Bookmarked' : 'Bookmark'} */}
                  </p>
            </div>
            <div className="appy-btn">
                <a href="/" target="_blank">
                Apply
                </a>{' '}
            </div>
        </div>
        </div>
    </div>
</div>
  )
}

export default exploreCard
