"use client";
import React, { useContext } from "react";
import Search from "../components/search.jsx";
import Card from "../components/exploreCard.jsx";
import { ExploreContext } from "../context/explorecontext.js";

const Explore = () => {
  const { internships, setInternships, loading } = useContext(ExploreContext);

  return (
    <>
      <Search internships={internships} setInternships={setInternships} />
      <div className="border m-5 rounded-lg p-5">
        {internships &&
          internships.map((internship) => (
            <div className="mb-5 p-3">
              <Card key={internship._id} internship={internship} />
            </div>
          ))}
      </div>
    </>
  );
};

export default Explore;
