import React from "react";
import Profiles from "../../Aside/Profiles/Profiles";

const SearchProfiles = () => {
  return (
    <div>
      <form className="search">
        <label htmlFor="default-search" className="search__label">
          Search
        </label>
        <div className="search__wrapper">
          <div className="search__icons">
            <svg
              className="search__icons-magnifier"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="search__input"
            placeholder="Search..."
            required
          />
        </div>
      </form>
      <Profiles />
    </div>
  );
};

export default SearchProfiles;
