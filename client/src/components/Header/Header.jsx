import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./Header.scss";
import { FaHome, FaBell } from "react-icons/fa";
import { SlMagnifier } from "react-icons/sl";
import { CgProfile } from "react-icons/cg";
import { RiMessage2Fill } from "react-icons/ri";
import { StoreContext } from "../store/StoreProvider";
import profileUser from "../../assets/profile-user.png";
import NotificationsMenu from "./NotificationsMenu/NotificationsMenu";
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isNotificationsMenuOpen, setIsNotificationsMenuOpen] = useState(false);

    const navigate = useNavigate();

    const { setIsPublishPostActive, setIsSearchActive, setIsLoggedIn } =
        useContext(StoreContext);

    const handleOpenAddPostModal = () => {
        setIsPublishPostActive(true);
    };

    const handleOpenSearchModal = () => {
        setIsSearchActive(true);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleShowNotifications = () => {
        setIsNotificationsMenuOpen((prevState) => !prevState);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <header className="header">
            <nav className="nav-header">
                <ul className="nav-header__list">
                    <Link to="/">
                        <li className="nav-header__item group">
                            <div className="nav-header__item-band nav-header__item-band--blue nav-header__item-band--move"></div>
                            <FaHome className="nav-header__item-icon nav-header__item-icon--blue " />

                            <p className="nav-header__item-text nav-header__item-text--blue">
                                Home
                            </p>
                        </li>
                    </Link>
                    <li
                        onClick={handleOpenSearchModal}
                        className="nav-header__item group"
                    >
                        <div className="nav-header__item-band nav-header__item-band--green nav-header__item-band--move"></div>
                        <SlMagnifier className="nav-header__item-icon nav-header__item-icon--green" />
                        <span className="nav-header__item-text nav-header__item-text--green">
                            Search
                        </span>
                    </li>
                    <li
                        onClick={handleShowNotifications}
                        className="nav-header__item group relative"
                    >
                        <div className="nav-header__item-band nav-header__item-band--yellow nav-header__item-band--move"></div>
                        <div className="relative">
                            <FaBell className="nav-header__item-icon nav-header__item-icon--yellow" />
                            <div class="absolute block w-3 h-3 bg-red-500 border-2 border-white rounded-full -top-0.5 start-2.5 dark:border-gray-900"></div>
                        </div>
                        <span className="nav-header__item-text nav-header__item-text--yellow">
                            Notifications
                        </span>
                        <NotificationsMenu
                            isNotificationsMenuOpen={isNotificationsMenuOpen}
                        />
                    </li>
                    <li className="nav-header__item group">
                        <div className="nav-header__item-band nav-header__item-band--orange nav-header__item-band--move"></div>
                        <RiMessage2Fill className="nav-header__item-icon nav-header__item-icon--orange" />
                        <span className="nav-header__item-text nav-header__item-text--orange">
                            Chat
                        </span>
                    </li>
                    <li className="nav-header__item group">
                        <button
                            onClick={handleOpenAddPostModal}
                            className="nav-header__item-textBtn"
                        >
                            Publish entry
                        </button>
                    </li>
                    <li
                        onClick={toggleDropdown}
                        className="nav-header__item nav-header__item--toBottom group"
                    >
                        <div className="nav-header__item-band nav-header__item-band--gray nav-header__item-band--move"></div>

                        <img
                            id="avatarButton"
                            type="button"
                            className="w-10 h-10 rounded-full cursor-pointer"
                            src={profileUser}
                            alt="User dropdown"
                        />
                        <span className="nav-header__item-text nav-header__item-text--gray ml-2">
                            Your Profile
                        </span>

                        {isDropdownOpen && (
                            <div
                                id="userDropdown"
                                className="z-10 absolute top-0 left-0 -translate-y-full bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
                            >
                                <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                                    <div>Bonnie Green</div>
                                    <div className="font-medium truncate">name@flowbite.com</div>
                                </div>
                                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                                    <li>
                                        <a
                                            href="#"
                                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                        >
                                            Dashboard
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                        >
                                            Settings
                                        </a>
                                    </li>
                                </ul>
                                <div className="py-1">
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                    >
                                        Sign out
                                    </button>
                                </div>
                            </div>
                        )}
                        {/* 
            <CgProfile className="nav-header__item-icon nav-header__item-icon--gray" />
            <span className="nav-header__item-text nav-header__item-text--gray">
              Profile
            </span> */}
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
