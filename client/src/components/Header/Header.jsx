import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";
import { FaHome, FaBell } from "react-icons/fa";
import { SlMagnifier } from "react-icons/sl";
import { CgProfile } from "react-icons/cg";
import { RiMessage2Fill } from "react-icons/ri";

const Header = ({ addPostModal }) => {
  return (
    <header className="header">
      <nav className="nav-header">
        <ul className="nav-header__list">
          <li className="nav-header__item group">
            <div className="nav-header__item-band nav-header__item-band--blue nav-header__item-band--move"></div>
            <FaHome className="nav-header__item-icon nav-header__item-icon--blue " />
            <Link
              to="/"
              className="nav-header__item-text nav-header__item-text--blue"
            >
              Home
            </Link>
          </li>
          <li className="nav-header__item group">
            <div className="nav-header__item-band nav-header__item-band--green nav-header__item-band--move"></div>
            <SlMagnifier className="nav-header__item-icon nav-header__item-icon--green" />
            <span className="nav-header__item-text nav-header__item-text--green">
              Search
            </span>
          </li>
          <li className="nav-header__item group">
            <div className="nav-header__item-band nav-header__item-band--yellow nav-header__item-band--move"></div>
            <FaBell className="nav-header__item-icon nav-header__item-icon--yellow" />
            <span className="nav-header__item-text nav-header__item-text--yellow">
              Notifications
            </span>
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
              onClick={addPostModal}
              className="nav-header__item-textBtn"
              data-modal-target="medium-modal"
              data-modal-toggle="medium-modal"
            >
              Publish entry
            </button>
          </li>
          <li className="nav-header__item nav-header__item--toBottom group">
            <div className="nav-header__item-band nav-header__item-band--gray nav-header__item-band--move"></div>
            <CgProfile className="nav-header__item-icon nav-header__item-icon--gray" />
            <span className="nav-header__item-text nav-header__item-text--gray">
              Profile
            </span>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
