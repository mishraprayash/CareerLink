"use client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFilter, faSearch, fas } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faFontAwesome, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'
import React, { useState} from 'react';
import './styles/search.css';
import FilterOptions from "./FilterOptions";
import { getReq } from "../hooks/service";
import { ToastMessage } from "./ToastMessage";
library.add(fas, faTwitter, faFontAwesome, faFilter, faSearch);

const Search = ({internships,setInternships}) => {

  const [query, setQuery] = useState('');
  const [originalData, setOriginalData] = useState(internships);
 const [showFilters, setShowFilters] = useState(false);
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
  const handleToggleFilters = () => {
    setShowFilters(!showFilters);
};

const applyFilters =async (filters) => {
    let Url = `/api/common/explore?`;
    Object.keys(filters).forEach(key => {
        const name = key;
        const value = filters[key];
        if (value !== null && value !== '') {
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
    console.log(request)
  if(request.error){
    ToastMessage("Error",request.msg)
  }else{
   
      setInternships(request.data)
      ToastMessage("Success","Internship found")
    
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
        <FontAwesomeIcon icon={faFilter} className="nine h-12 p-2" onClick={handleToggleFilters} />
        {showFilters && <FilterOptions applyFilters={applyFilters} />}
      </div>
    </div>
  );
}

export default Search;
