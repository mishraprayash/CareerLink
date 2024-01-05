import React from 'react'
import './styles/landingStyle.css'

const LandingPage = () => {
  return (
    <div className='lpage'>
      <div className="content">
    <div className="singlecontent">
      <div className="left">
        <h1>CareerForge Nexus</h1>
        <p>"Dive into opportunities, unleash potential, and illuminate your journey with best provided internships, practical hands on experience in the real world problems and with the best mentorship and career guides.""</p>
        <button className="forexplorebtn">EXPLORE OPPORTUNITIES</button>
      </div>
      <div className="right">
        <div className="box">
          <h4>Involve in Different Activities</h4>
          <p className="boxp">internship</p>
          <p className="boxp" >career guidance program</p>
          <p className="boxp">training from experts</p>
        </div>
        <img className="firstimg"src="/image/logo.png"/>
        

      </div>
    </div>

    <div className="singlecontent">
      <div className="right">
        
        <img className="otherimg"src="/image/collaboration.jpg"/>
        
        
      </div>

      <div className="left">
        <h1>Be a Trailblazing Affiliated Partner</h1>
        <p>Ignite growth for your company with our Affiliated Partner program. Seamlessly offer internships, cutting-edge training, and mentorship. Let's shape success together!"</p>
        <button className="forexplorebtn">JOIN OUR PLATFORM</button>
      </div>
    </div>


    <div className="singlecontent"> <div className="left">
        <h1>Trusted Affiliation</h1>
        <p>"At CareerLink, we stand among the best, backed by partnerships with industry giants like [Notable Company 1], [Notable Company 2], and [Notable Company 3]. Join us for unparalleled opportunities and trusted connections in your journey to success."</p>
        <img className="extraimg"src="/image/tick.png"/>
      </div>
      <div className="right">
        
        <img className="extraimg"src="/image/handshakingz.jpg"/>
        
        
      </div>
    </div>
    <div className="singlecontent">
<div className="left">
  <h1>Partners</h1>
  <p>Their unwavering commitment to our mission amplifies our dedication to fostering a thriving educational environment. Together, with our incredible partners, we strive to empower students with an even greater array of transformative experiences, ensuring a future rich with possibilities"</p>
 
</div>
<div className="right">
        
  <img className="extraimg"src="/image/handshaking.jpg"/>
  
  
</div>

    </div>
  </div>
    </div>
  )
}

export default LandingPage
