"use client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFilter, faSearch, fas } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faFontAwesome, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'
import React, { useState, useContext } from 'react';
import './styles/search.css';
import { ToastMessage } from "./ToastMessage";
library.add(fas, faTwitter, faFontAwesome, faFilter, faSearch);

const Search = ({internships,setInternships}) => {
  // if(internships==null){
  //   ToastMessage("Warning","refresh page to search")
  // }
  const [query, setQuery] = useState('');
  const [originalData, setOriginalData] = useState(internships);

  // Store the original data on component mount
  useState(() => {
    setOriginalData(internships);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault()
    const searchTerm = e.target.value.toLowerCase();
    setQuery(searchTerm);
    
    // If search term is empty, show original data
    if (searchTerm === '') {
      setInternships(originalData);
    } else {
      // Filter the internships based on search term
      const searchedData =originalData&& originalData.filter(item =>
        item.position.toLowerCase().includes(searchTerm)
      );
      setInternships(searchedData);
    }
  };

  return (
    <div className="one">
      <div className="four">
        <div className="five">

          <FontAwesomeIcon icon={faSearch} size="xs" className="six h-12 p-2" />
          <input
            className="seven"
            type="text"
            placeholder="Search internships..."
            value={query}
            onChange={handleSearch}
          />
        </div>

        <div className="ten">
          <span className="eleven">Search</span>
        </div>
        <FontAwesomeIcon icon={faFilter} className="nine h-12 p-2" />
        
      </div>
    </div>
  );
}

export default Search;
