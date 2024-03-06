"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faFilter, faSearch, fas } from "@fortawesome/free-solid-svg-icons";
import { faTwitter, faFontAwesome } from "@fortawesome/free-brands-svg-icons";
import React, { useState } from "react";
import "./styles/search.css";
import FilterOptions from "./FilterOptions";
import { getReq } from "../hooks/service";
import { ToastMessage } from "./ToastMessage";
library.add(fas, faTwitter, faFontAwesome, faFilter, faSearch);

const Search = ({ internships, setInternships }) => {
  const [query, setQuery] = useState("");
  const [originalData, setOriginalData] = useState(internships);
  const [showFilters, setShowFilters] = useState(false);
  // Store the original data on component mount
  useState(() => {
    setOriginalData(internships);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchTerm = e.target.value.toLowerCase();
    setQuery(searchTerm);

    // If search term is empty, show original data
    if (searchTerm === "") {
      setInternships(originalData);
    } else {
      // Filter the internships based on search term
      const searchedData =
        originalData &&
        originalData.filter((item) =>
          item.position.toLowerCase().includes(searchTerm)
        );
      setInternships(searchedData);
    }
  };
  const handleToggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const applyFilters = async (filters) => {
    let Url = `/api/common/explore?`;
    Object.keys(filters).forEach((key) => {
      const name = key;
      const value = filters[key];
      if (value !== null && value !== "") {
        const encodedValue = encodeURIComponent(value);
        Url = `${Url}${name}=${encodedValue}&`;
      }
    });
    // Remove the last '&' character if present
    Url = Url.slice(0, -1);
    console.log(Url);

    setTimeout(() => {
      setShowFilters(!showFilters);
    }, 1000);

    const request = await getReq(Url);
    console.log(request);
    if (request.error) {
      ToastMessage("Error", request.msg);
    } else {
      setInternships(request.data);
      ToastMessage("Success", "Internship found");
    }
  };

  return (
    <div className="bg-[#F2F4F7] flex items-center justify-center p-4">
      <div className="flex items-center bg-slate-300 rounded-full shadow-sm shadow-black">
        <div className="flex items-center justify-center">
          <FontAwesomeIcon
            icon={faSearch}
            size="xs"
            className="p-2 h-5 m-4 bg-white rounded-full"
          />
          <input
            className="p-3 rounded-full focus:outline-none focus:ring focus:ring-violet-300"
            type="text"
            placeholder="Search internships..."
            value={query}
            onChange={handleSearch}
          />
        </div>

        <div className="ten">
          <span className="font-[1rem] text-center bg-gray-500 px-3 py-2 rounded-full cursor-pointer">
            Search
          </span>
        </div>
        <FontAwesomeIcon
          icon={faFilter}
          className="p-3 h-10 text-green-600"
          onClick={handleToggleFilters}
        />
        {showFilters && <FilterOptions applyFilters={applyFilters} />}
      </div>
    </div>
  );
};

export default Search;
