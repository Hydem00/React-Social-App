import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Aside.scss";
import Profiles from "./Profiles/Profiles";
import ToastWarning from "./ToastWarning/ToastWarning";

const Aside = () => {
  const [profileToSearch, setProfileToSearch] = useState("");
  const [trendingProfiles, setTrendingProfiles] = useState({});
  const navigate = useNavigate();

  const handleProfileToSearch = (event) => {
    setProfileToSearch(event.target.value);
  };

  const handleSearchProfile = (event) => {
    event.preventDefault();
    navigate(`/searchedProfiles/${profileToSearch}`);
  };

  const fetchTrendingProfiles = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/users/trending`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      const result = response.data;
      // console.log(result);
      setTrendingProfiles(result.data.filter((profile) => !profile.isMe));
    } catch (error) {
      console.error("Wystąpił błąd przy pobieraniu danych:", error);
      setTrendingProfiles({});
    }
  };

  useEffect(() => {
    fetchTrendingProfiles();
  }, []);

  return (
    <aside className="aside">
      <div className="aside__wrapper">
        <form onSubmit={handleSearchProfile} className="search">
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
              onChange={handleProfileToSearch}
              value={profileToSearch}
              type="search"
              id="default-search"
              className="search__input"
              placeholder="Search..."
              required
            />
            <button type="submit" className="search__submit-btn bg-[#1E9BF0]">
              Search
            </button>
          </div>
        </form>

        <Profiles
          isAside={true}
          trendingProfiles={trendingProfiles}
          fetchTrendingProfiles={fetchTrendingProfiles}
        />
      </div>
      <ToastWarning />
    </aside>
  );
};

export default Aside;
