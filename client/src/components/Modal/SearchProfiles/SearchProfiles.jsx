import React, { useEffect, useState } from "react";
import axios from "axios";
import Profiles from "../../Aside/Profiles/Profiles";

const SearchProfiles = ({ closeModal }) => {
  const [profiles, setProfiles] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchProfiles, setSearchProfiles] = useState([]);
  // const [searchingText, setSearchingText] = useState("");

  const handleSearchText = (event) => {
    setSearchText(event.target.value);
    handleSearchingText();
  };

  const handleSearchingText = () => {
    const filteredProfiles = profiles.filter((item) =>
      item.username.toLowerCase().includes(searchText.toLowerCase())
    );
    setSearchProfiles(filteredProfiles);
  };

  const fetchProfiles = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/users/all", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      const result = response.data;
      console.log(result);
      setProfiles([]);
      setSearchProfiles([]);
      setProfiles(result.data.filter((profile) => !profile.isMe));
    } catch (error) {
      console.error("Wystąpił błąd przy pobieraniu danych:", error);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
        className="search"
      >
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
            onChange={handleSearchText}
            value={searchText}
            type="search"
            id="default-search"
            className="search__input"
            placeholder="Search..."
            required
          />
        </div>
      </form>
      <Profiles
        closeModal={closeModal}
        isSearchingModal={true}
        searchProfiles={searchProfiles}
        fetchProfiles={fetchProfiles}
      />
    </div>
  );
};

export default SearchProfiles;
