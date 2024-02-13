import React, { useContext, useEffect, useState } from "react";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Aside from "./components/Aside/Aside";
import "./App.scss";
import { BrowserRouter as Router } from "react-router-dom";
import Modal from "./components/Modal/Modal";
import { StoreContext } from "./components/store/StoreProvider";
import axios from "axios";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    setProfileInfo,
    profileInfo,
    isPublishPostActive,
    setIsPublishPostActive,
    isSearchActive,
    setIsSearchActive,
  } = useContext(StoreContext);

  const handleModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsPublishPostActive(false);
    setIsSearchActive(false);
  };

  const getProfileData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/auth/me", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      const result = response.data;
      // console.log(result);
      return result;
    } catch (error) {
      console.error("There was a problem with the axios operation:", error);
    }
  };

  useEffect(() => {
    getProfileData()
      .then(({ data }) => {
        setProfileInfo(data);
      })
      .catch((error) => {
        console.error("Error getting data:", error);
      });
  }, []);

  useEffect(() => {
    if (isPublishPostActive || isSearchActive) {
      handleModal();
    } else {
      handleCloseModal();
    }
  }, [isPublishPostActive, isSearchActive]);

  return (
    <div className="App">
      <div className="wrapper">
        <Router>
          <Header openModal={handleModal} />
          <Main />
          <Aside />
          <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
        </Router>
      </div>
    </div>
  );
}

export default App;
