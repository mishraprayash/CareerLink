

import React from 'react';
import './footerStyle.css';

const Footer = () => {
  return (
    <div>
       <div className="footerpart">
    <div className="footer1">
      <h2>ABOUT US</h2>
      <div className="college">
        <div className="clogo"><img className="clogo" src="../Images/logo.png"/></div>
        <div className="name"></div>
      </div>
      <div className="info">
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
      <i className="fa-brands fa-facebook"></i>
      <i className="fa-brands fa-linkedin"></i>
      <i className="fa-brands fa-instagram"></i></div>
  </div>
    </div>
  )
}

export default Footer
