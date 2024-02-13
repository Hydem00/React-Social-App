import React, { useContext, useEffect, useState } from "react";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Aside from "./components/Aside/Aside";
import View from "./View";
import "./App.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Modal from "./components/Modal/Modal";
import { StoreContext } from "./components/store/StoreProvider";
import axios from "axios";

//
import Login from "./components/Main/Auth/Login";
import Register from "./components/Main/Auth/Register";

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
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="*" element={<View />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
