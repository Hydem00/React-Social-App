import React from "react";
import profileUser from "../../assets/profile-user.png";
import "./Aside.scss";

const Aside = () => {
  return (
    <aside className="aside">
      <div className="aside__wrapper">
        <form className="search">
          <label htmlFor="default-search" className="search__label">
            Search
          </label>
          <div className="search__wrapper">
            <div className="search__icons">
              <svg
                className="search__icons-magnifier"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="search__input"
              placeholder="Search..."
              required
            />
            <button type="submit" className="search__submit-btn bg-[#1E9BF0]">
              Search
            </button>
          </div>
        </form>

        <section className="profiles">
          <h3 className="profiles__title">Profiles worth following</h3>
          <div className="profile">
            <img className="profile__icon" src={profileUser} alt="" />
            <a className="profile__name" href="">
              Lorem ipsum
            </a>
            <button className="profile__follow-btn">Follow</button>
          </div>
        </section>
      </div>
    </aside>
  );
};

export default Aside;
