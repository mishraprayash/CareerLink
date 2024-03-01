import ReactDOM from "react-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";

import { faFilter, faSearch, fas } from "@fortawesome/free-solid-svg-icons";
import { faTwitter, faFontAwesome } from "@fortawesome/free-brands-svg-icons";
library.add(fas, faTwitter, faFontAwesome, faFilter, faSearch);

import React from "react";
import "./styles/search.css";
const search = () => {
  return (
    <>
      <div className="one  ">
        <div className="four ">
          <div className="five ">
            <FontAwesomeIcon
              icon={faSearch}
              size="xs"
              className=" six h-12 p-2  "
            />
            <input
              className=" seven "
              type="text"
              placeholder="Search internships..."
            />
          </div>
          <FontAwesomeIcon icon={faFilter} className="  nine h-12 p-2  " />

          <div className="ten">
            <span className="eleven">Search</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default search;
