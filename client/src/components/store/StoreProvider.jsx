import React, { useState, createContext } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreProvider = ({ children }) => {
  const [profileInfo, setProfileInfo] = useState({});
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isPublishPostActive, setIsPublishPostActive] = useState(false);
  const [isPostWarningActive, setIsPostWarningActive] = useState(false);

  const handleToggleFollow = async (id, followToggle, fetchFun) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/users/${id}/${followToggle}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      const result = response.data;
      // console.log(result);
      fetchFun();
    } catch (error) {
      console.error("Wystąpił błąd przy pobieraniu danych:", error);
    }
  };

  return (
    <StoreContext.Provider
      value={{
        profileInfo,
        setProfileInfo,
        isSearchActive,
        setIsSearchActive,
        isPublishPostActive,
        setIsPublishPostActive,
        isPostWarningActive,
        setIsPostWarningActive,
        handleToggleFollow,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
