import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Profiles from "../../Aside/Profiles/Profiles";
import "./SearchedProfiles.scss";

const SearchedProfiles = () => {
  const [searchedProfiles, setSearchedProfiles] = useState({});
  const { name } = useParams();

  const fetchSearchedProfiles = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/users/${name}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      const result = response.data;
      // console.log(result);
      if (!result.data.isMe) setSearchedProfiles(result.data);
      else setSearchedProfiles({});
    } catch (error) {
      console.error("Wystąpił błąd przy pobieraniu danych:", error);
      setSearchedProfiles({});
    }
  };

  useEffect(() => {
    fetchSearchedProfiles();
  }, [name]);

  return (
    <div className="searched-profiles">
      <h2 className="searched-profiles__headline">Searched Profiles</h2>
      {searchedProfiles && Object.keys(searchedProfiles).length !== 0 ? (
        <Profiles
          isSearchedProfileActive={true}
          searchedProfiles={searchedProfiles}
          fetchSearchedProfiles={fetchSearchedProfiles}
        />
      ) : (
        <div className="text-center">There is no such a profile!</div>
      )}
    </div>
  );
};

export default SearchedProfiles;
