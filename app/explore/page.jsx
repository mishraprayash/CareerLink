"use client";
import React, { useContext } from "react";
import Search from "../components/search";
import Card from "../components/exploreCard";
import { ExploreContext } from "../context/explorecontext";

const Explore = () => {
  const { internships, loading } = useContext(ExploreContext);
  // console.log(internships);

  return (
    <>
      <Search />
      <div className="border ">
        {internships &&
          internships.map((internship) => (
            <Card key={internship._id} internship={internship} />
          ))}
      </div>
    </>
  );
};

export default Explore;
