import React, { useState } from "react";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Aside from "./components/Aside/Aside";
import "./App.scss";
import { BrowserRouter as Router } from "react-router-dom";
import ModalAddPost from "./components/Main/Post/ModalAddPost/ModalAddPost";

function App() {
  const [isModalAddPostOpen, setIsModalAddPostOpen] = useState(false);

  const handleAddPostModal = () => {
    setIsModalAddPostOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalAddPostOpen(false);
  };

  return (
    <div className="App">
      <div className="wrapper">
        <Router>
          <Header addPostModal={handleAddPostModal} />
          <Main />
          <Aside />
          <ModalAddPost
            isOpen={isModalAddPostOpen}
            onClose={handleCloseModal}
          />
        </Router>
      </div>
    </div>
  );
}

export default App;
