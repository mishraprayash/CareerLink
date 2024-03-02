
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";

import { faFilter, faSearch, fas } from "@fortawesome/free-solid-svg-icons";
import { faTwitter, faFontAwesome } from "@fortawesome/free-brands-svg-icons";
library.add(fas, faTwitter, faFontAwesome, faFilter, faSearch);

import React from "react";
import "./styles/search.css";
const search = () => {
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
            />
          </div>
          <FontAwesomeIcon icon={faFilter} className="p-3 h-10 text-green-600" />
          <div className="ten">
            <span className="font-[1rem] text-center bg-gray-500 px-3 py-2 rounded-full cursor-pointer">Search</span>
          </div>
        </div>
      </div>
  );
};

export default search;
