
'use client'
import React, { useContext } from "react";
import Search from "../components/search.js"
// import CardFull from "../components/exploreCardFull.js"
// import Card from "../components/exploreCard.js"
// import './explore.css'
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faFacebook,  faInstagram, faLinkedin , faSearchengin,faFigma} from "@fortawesome/free-brands-svg-icons";


import Card from "../components/exploreCard.js";
import {ExploreContext} from "../context/explorecontext.js";


const Explore = () => {
  const { internships, loading } = useContext(ExploreContext);
  // console.log(internships);

  return (
    <>
{/* <<<<<<< HEAD */}
{/*     
//  <Search/>
//  <Card/> 


//  */}

      <Search />
     
      <div className="border ">


      {internships  && internships.map((internship) => (
        <Card key={internship._id} internship={internship} />
           
        ))}
        
      </div>
    </>
  );
};

export default Explore;
