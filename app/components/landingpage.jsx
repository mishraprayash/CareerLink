import React from 'react'
import './styles/landingStyle.css'
import Image from 'next/image'
const LandingPage = () => {
  return (
    <div className='lpage'>
      <div className="content">
    <div className="singlecontent">
      <div className="lleft">
        <h1 className='lheader'>CareerForge Nexus</h1>
        <p>"Dive into opportunities, unleash potential, and illuminate your journey with best provided internships, practical hands on experience in the real world problems and with the best mentorship and career guides.""</p>
        <button className="forexplorebtn">EXPLORE OPPORTUNITIES</button>
      </div>
      <div className="lright">
        <div className="lbox">
          <h4 className='lheader'>Involve in Different Activities</h4>
          <p className="boxp">internship</p>
          <p className="boxp" >career guidance program</p>
          <p className="boxp">training from experts</p>
        </div>
        {/* <img className="firstimg"src="/image/logo.png"/> */}
        <Image src="https://res.cloudinary.com/dkracb8u5/image/upload/v1706380270/Careerlink/Public/tuzqbpgoquw2pg6ytgon.png" alt="logo" className='firstimg' width={500} height={300} />
    
        

      </div>
    </div>

    <div className="singlecontent">
      <div className="lright">
        
        {/* <img className="otherimg"src="/collaboration.jpg"/> */}
        <Image className="otherimg" src="https://res.cloudinary.com/dkracb8u5/image/upload/v1706380270/Careerlink/Public/kgd5nkourxfvehtwlsiq.jpg" width={400} height={400} alt="collaboration" />       
      </div>

      <div className="lleft">
        <h1 className='lheader'>Be a Trailblazing Affiliated Partner</h1>
        <p>Ignite growth for your company with our Affiliated Partner program. Seamlessly offer internships, cutting-edge training, and mentorship. Let's shape success together!"</p>
        <button className="forexplorebtn">JOIN OUR PLATFORM</button>
      </div>
    </div>


    <div className="singlecontent"> <div className="lleft">
        <h1 className='lheader'>Trusted Affiliation</h1>
        <p>"At CareerLink, we stand among the best, backed by partnerships with industry giants like [Notable Company 1], [Notable Company 2], and [Notable Company 3]. Join us for unparalleled opportunities and trusted connections in your journey to success."</p>
        {/* <img className="extraimg"src="/image/tick.png"/> */}
        <Image className="extraimg" src="https://res.cloudinary.com/dkracb8u5/image/upload/v1706380270/Careerlink/Public/qbkeuuktrhlywc8qzzxo.png" alt="tick" width={500} height={300} />
    
      </div>
      <div className="lright">
      
        {/* <img className="extraimg"src="/image/handshakingz.jpg"/> */}
        <Image className="extraimg" src="https://res.cloudinary.com/dkracb8u5/image/upload/v1706380270/Careerlink/Public/ab62m6gftdbevhixphda.jpg" alt="handshaking" width={500} height={300} /> 
        
      </div>
    </div>
    <div className="singlecontent">
<div className="lleft">
  <h1 className='lheader'>Partners</h1>
  <p>Their unwavering commitment to our mission amplifies our dedication to fostering a thriving educational environment. Together, with our incredible partners, we strive to empower students with an even greater array of transformative experiences, ensuring a future rich with possibilities"</p>
 
</div>
<div className="lright">
        
  {/* <img className="extraimg"src="/image/handshaking.jpg"/> */}
  <Image className="extraimg" src="https://res.cloudinary.com/dkracb8u5/image/upload/v1706380270/Careerlink/Public/caougtcgbdotesnx1e8r.jpg" alt="handshaking" width={500} height={300} />
  
  
</div>

    </div>
  </div>
    </div>
  )
}

export default LandingPage
