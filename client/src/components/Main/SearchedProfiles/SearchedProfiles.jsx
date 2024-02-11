import React from "react";
import Profiles from "../../Aside/Profiles/Profiles";
import "./SearchedProfiles.scss";

const SearchedProfiles = () => {
  return (
    <div className="searched-profiles">
      <h2 className="searched-profiles__headline">Searched Profiles</h2>
      <Profiles />
    </div>
  );
};

export default SearchedProfiles;
