

import ReactDOM from 'react-dom'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFacebook, faInstagram, faLinkedin, faSearchengin, faFigma } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faFilter, faSearch, fas } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faFontAwesome, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'
library.add(fas, faTwitter, faFontAwesome, faFilter, faSearch)

// import { faHatCowboy } from '@fortawesome/pro-thin-svg-icons'
// import { faHatChef } from '@fortawesome/sharp-solid-svg-icons'
// import { faPlateUtensils } from '@fortawesome/sharp-regular-svg-icons'




import Image from "next/image";
import React from 'react';
import './styles/search.css'
const search = () => {
  return (
    <>
      <div className="one  ">
        <div className="four ">
          <div className="five ">

            {/* <svg xmlns="http://www.w3.org/2000/svg" className=" six " fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
           </svg> */}

            <FontAwesomeIcon icon={faSearch} size="xs" className=" six h-12 p-2  " />
            <input className=" seven " type="text" placeholder="Search internships..." />
          </div>
          <FontAwesomeIcon icon={faFilter} className="  nine h-12 p-2  " />

          <div className="ten">
            <span className="eleven">Search</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default search
