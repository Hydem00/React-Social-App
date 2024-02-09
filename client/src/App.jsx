import React, { useContext, useEffect, useState } from "react";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Aside from "./components/Aside/Aside";
import "./App.scss";
import { BrowserRouter as Router } from "react-router-dom";
import Modal from "./components/Modal/Modal";
import { StoreContext } from "./components/store/StoreProvider";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
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
