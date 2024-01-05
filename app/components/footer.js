import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook,  faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";
import React from 'react';
import './styles/footerStyle.css';

const Footer = () => {
  return (
    <div>
       <div className="footerpart">
    <div className="footer1">
      <h2>ABOUT US</h2>
      <div className="college">
        <div className="">
          <Image className=" ml-12" src="/image/campuslogo.png" width={260} height={130}/></div>
        <div className="name"></div>
      </div>
      <div className=" ml-12">
       <p> P.O. Box : 46 , Lamachaur Pokhara</p>
       <p>Tel. : 061-440457, 440463, 440093, 440465</p>
       <p>Fax No. : 061-440158</p>
       <p>E-mail : info@ioepas.edu.np</p>
      </div>
    </div>
    <div className="footer2"><h2>COMPANIES</h2>
    <p>partnership</p>
  <p>career</p>
<p>explore opportunities</p></div>
    <div className="footer3"><h2>SOCIAL</h2>
    <div className=" flex justify-center">
    <FontAwesomeIcon icon={faFacebook} size="xs" className="h-12 p-2  text-blue-800" />
    <FontAwesomeIcon icon={faLinkedin} size="xs" className="h-12 p-2 text-blue-600" />
    <FontAwesomeIcon icon={faInstagram} size="xs" className="h-12 p-2 text-blue-600" />
    </div>
   
     </div>
  </div>
    </div>
  )
}

export default Footer
