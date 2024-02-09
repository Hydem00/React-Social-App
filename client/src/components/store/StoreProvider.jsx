import React, { useState, createContext } from "react";

export const StoreContext = createContext(null);

const StoreProvider = ({ children }) => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isPublishPostActive, setIsPublishPostActive] = useState(false);

  return (
    <StoreContext.Provider
      value={{
        isSearchActive,
        setIsSearchActive,
        isPublishPostActive,
        setIsPublishPostActive,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
