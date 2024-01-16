import React from 'react'
import './styles/exploreCard.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFacebook,  faInstagram, faLinkedin , faSearchengin,faFigma} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faFilter, faSearch, fas } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faFontAwesome, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'
library.add(fas, faTwitter, faFontAwesome, faFilter,faSearch)
{/* <FontAwesomeIcon  icon={faFilter}  className="  nine h-12 p-2  "/ >*/}


const exploreCard = () => {
  return (
    <div className='main'>
     <div className='aCard'>
<div className='left'>
<div className='Clogo '>
<img className="Alogo h-19 w-auto" src="/image/collaboration.jpg" alt='clogo'/></div>
<div className='cname'>Yasmini Private Limited</div>

</div>
<div className='right '>my neame is</div>

    
    </div>
    </div>
  )
}

export default exploreCard
