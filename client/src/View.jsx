import React, { useContext, useEffect, useState } from "react";

import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Aside from "./components/Aside/Aside";
import Modal from "./components/Modal/Modal";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "./components/store/StoreProvider";

const View = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {
        isPublishPostActive,
        setIsPublishPostActive,
        isSearchActive,
        setIsSearchActive,
        isLoggedIn,
        setIsLoggedIn
    } = useContext(StoreContext);

    const handleModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setIsPublishPostActive(false);
        setIsSearchActive(false);
    };

    const navigate = useNavigate();

    useEffect(() => {
        if (isPublishPostActive || isSearchActive) {
            handleModal();
        } else {
            handleCloseModal();
        }
    }, [isPublishPostActive, isSearchActive]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetch('http://localhost:3001/api/auth/me', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            })
                .then(response => response.json())
                .then(data => {
                    if (!data.success) {
                        localStorage.removeItem('token');
                        navigate('/login');
                        setIsLoggedIn(false);
                    } else {
                        setIsLoggedIn(true);
                    }
                })
                .catch(error => {
                    console.error('Error verifying token:', error);
                    navigate('/login');
                });
        } else {
            navigate('/login');
        }
    }, [navigate, setIsLoggedIn]);

    return (
        <div className="wrapper">
            <Header openModal={handleModal} />
            <Main />
            <Aside />
            <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
        </div>
    );
};

export default View;
