import React, { useState } from "react";
import profileUser from "../../../assets/profile-user.png";
import "./ProfileContent.scss";
import Post from "../Post/Post";

const ProfileContent = () => {
  const [isEntriesActive, setIsEntriesActive] = useState(true);
  const [isLikesActive, setIsLikesActive] = useState(false);

  const handleDisplayEntries = () => {
    setIsEntriesActive(true);
    setIsLikesActive(false);
  };

  const handleDisplayLikedPosts = () => {
    setIsLikesActive(true);
    setIsEntriesActive(false);
  };

  return (
    <section className="user-profile">
      <img className="user-profile__img" src={profileUser} alt="" />
      <button className="user-profile__follow-btn">Follow</button>
      <div className="user-profile__info">
        <h2 className="user-profile__name">Lorem Ipsum</h2>
        <p className="user-profile__description">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde
          inventore quis officia ullam autem soluta sed quibusdam temporibus
          cupiditate, nemo tempore ratione, saepe omnis aut debitis ad magni,
          obcaecati deserunt!
        </p>
        <div className="user-profile__follows-wrapper">
          <span className="user-profile__following-number">Following: 0</span>
          <span className="user-profile__followers-number">Followers: 0</span>
        </div>
      </div>
      <div className="user-profile__posts">
        <div className="user-profile__post-types">
          <div
            onClick={handleDisplayEntries}
            className={`user-profile__post-type ${
              isEntriesActive ? "user-profile__post-type--active" : ""
            }`}
          >
            Entries
          </div>
          <div
            onClick={handleDisplayLikedPosts}
            className={`user-profile__post-type ${
              isLikesActive ? "user-profile__post-type--active" : ""
            }`}
          >
            Likes
          </div>
        </div>
        <Post isPostingActive={false} />
      </div>
    </section>
  );
};

export default ProfileContent;
