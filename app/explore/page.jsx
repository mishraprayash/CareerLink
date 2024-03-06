"use client";
import React, { useContext } from "react";
import Search from "../components/search.jsx";
import Card from "../components/exploreCard.jsx";
import { ExploreContext } from "../context/explorecontext.js";

const Explore = () => {
  const { internships, setInternships, loading } = useContext(ExploreContext);
  console.log(loading);

  return (
    <>
      {loading? <div className="text-center p-5 m-5 h-[75vh] font-semibold">Loading Internsips.....</div>:(
        <div>
          <Search internships={internships} setInternships={setInternships} />
          <div className="border m-5 rounded-lg p-5">
            {internships && 
              internships.map((internship) => (
                <div className="mb-5 p-3">
                  <Card key={internship._id} internship={internship} />
                </div>
              ))}
              {!internships && <div>No any Internships Available</div>}
          </div>
        </div>)
      }
    </>
  );
};

export default Explore;
