import React from "react";
import "./Profiles.scss";
import profileUser from "../../../assets/profile-user.png";

const Profiles = ({ isAside }) => {
  return (
    <section className="profiles">
      {isAside ? (
        <h3 className="profiles__title">Profiles worth following</h3>
      ) : (
        ""
      )}
      <div className="profile">
        <img className="profile__icon" src={profileUser} alt="" />
        <a className="profile__name" href="">
          Lorem ipsum
        </a>
        <button className="profile__follow-btn">Follow</button>
      </div>
      {!isAside ? (
        <p className="profile__description">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi,
          corporis! Quasi, ea ad ut eligendi assumenda officia quod ratione
          iure, placeat ipsum delectus temporibus natus, veniam maxime? Quod,
          quia doloribus!
        </p>
      ) : (
        ""
      )}
    </section>
  );
};

export default Profiles;
