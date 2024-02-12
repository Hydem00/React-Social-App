import React, { useContext, useEffect, useState } from "react";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Aside from "./components/Aside/Aside";
import View from "./View";
import "./App.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Modal from "./components/Modal/Modal";
import { StoreContext } from "./components/store/StoreProvider";

//
import Login from "./components/Main/Auth/Login";

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
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="*" element={<View />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
