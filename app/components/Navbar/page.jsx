"client"

import React from "react";
import './navstyle.css';



const navbar = () => {
  return (
    <div className="nav">
    <div className="logo">
      <img className="logoimg" src="../../image/logo.png"/>
    </div>
    <div className="name">CareerLink</div>
    <div className="forbutton">
      <a href="/">
      <button  className="loginbtn">LOGIN</button></a>
      <button  className="registerbtn">REGISTER</button>
    </div>
     </div>
  )
}

export default navbar
