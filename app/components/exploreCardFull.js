"use client";
import React from 'react'
import './styles/exploreCardFull.css';


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFacebook,  faInstagram, faLinkedin , faSearchengin,faFigma} from "@fortawesome/free-brands-svg-icons";
import { faCoins, faEnvelope, faFilter, faSearch, fas,faLocationDot , faClock, faBriefcase} from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faFontAwesome, faLinkedinIn} from '@fortawesome/free-brands-svg-icons'
library.add(fas, faTwitter, faFontAwesome, faFilter,faSearch,faLocationDot,faCoins,faBriefcase)

{/* <FontAwesomeIcon  icon={faFilter}  classsName="  nine h-12 p-2  "/ >*/}




const exploreCardFull = () => {
  return (


    <div className='main'>
        <button className="button1">Back to explore</button>
     <div className='aCard'>
     <div className='left'>
     <div className='Clogo '>
     <img className="Alogo " src="collaboration.jpg" height="100px" width="100px" alt='clogo'/></div>
     <div className='cname'>Yasmini Private Limited</div>

     <div className="listOfSymbol">                                                     
        <div className='onesymbol'>
            <div> <FontAwesomeIcon icon={faLocationDot}  height="45px" width="45px" className=" Alogo " />
            {/* <img className="Alogo " src="collaboration.jpg" height="45px" width="45px" alt='comlogo'/> */}
            </div>
            <div>
                <div className="sTitle">location</div>
                <div className="sValue">pokhara</div>
            </div>
        </div>
        <div className='onesymbol'>
            <div>
            <FontAwesomeIcon icon={faClock}  height="45px" width="45px" className=" Alogo " />
            </div>
            <div>
                <div className="sTitle">time</div>
                <div className="sValue">10-4</div>
            </div>
        </div>
        <div className='onesymbol'>
            <div>
            <FontAwesomeIcon icon={faBriefcase}  height="45px" width="45px" className=" Alogo " />
            </div>
            <div>
                <div className="sTitle">position</div>
                <div className="sValue">junior developer</div>
            </div>
        </div>
        <div className='onesymbol'>
            <div className=" Alogo " > 
                <FontAwesomeIcon icon={faCoins} size="6xs" className=" Alogo " />
            </div>
            <div>
                <div className="sTitle">salary</div>
                <div className="sValue">$100 per week</div>
            </div>
        </div>
       

     </div>
     <div className='aboutCompany'><h3>About company</h3>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Est necessitatibus
         laudantium impedit odit delectus earum facilis eligendi nostrum dolor? Cupiditate quos officia nisi
          doloremque dolorem, sint, accusantium alias quam aliquid itaque tempore unde quas eos, expedita eveniet 
          eaque. Officia aspernatur soluta quia non maiores eum. Voluptates, blanditiis? Inventore, reprehenderit voluptates.</div>
     
     </div>
     <div className='right '>
        <div className='description'>
            <h4>Job Description</h4>
            <p>
                hh ddhhd dhhd hdh dh hdh dh hd hdkskhs hhs hsj shs fhskfhsf  skhsf shkd sfhg sdfh sdfgh  hs
                sjsdjfh shsdf hsdfkhskdf dhkdss kshs sjhksjfh skhsh shshf shsfgh sdfghsdg fhsghsg 
            </p>               
        </div>
        <div><h4>Responsibilities of Candidates</h4>
        <ul >
            <li>Lorem ipsum dolor sit amet.</li>
            <li>Lorem ipsum dolor sit amet.</li>
            <li>Lorem ipsum dolor sit amet.</li>
            <li>Lorem ipsum dolor sit amet.</li>
        </ul></div>
        <div>
            <h4>Requirements</h4>
            <ul >
                <li>Lorem ipsum dolor sit amet.</li>
                <li>Lorem ipsum dolor sit amet.</li>
                <li>Lorem ipsum dolor sit amet.</li>
                <li>Lorem ipsum dolor sit amet.</li>
            </ul></div>
            <div >  
                <button className="button2">Apply Now</button>
                </div>
           
             </div></div>
            
     </div>
   
  )
}

export default exploreCardFull
