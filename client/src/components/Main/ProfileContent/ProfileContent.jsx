import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ProfileContent.scss";
import Post from "../Post/Post";
import { StoreContext } from "../../store/StoreProvider";

const ProfileContent = () => {
  const [isEntriesActive, setIsEntriesActive] = useState(true);
  const [isLikesActive, setIsLikesActive] = useState(false);
  const [isRetweetedActive, setIsRetweetedActive] = useState(false);
  const [currentProfile, setCurrentProfile] = useState({});
  const { handleToggleFollow } = useContext(StoreContext);
  const { name } = useParams();

  const handleDisplayEntries = () => {
    setIsEntriesActive(true);
    setIsLikesActive(false);
    setIsRetweetedActive(false);
  };

  const handleDisplayLikedPosts = () => {
    setIsLikesActive(true);
    setIsEntriesActive(false);
    setIsRetweetedActive(false);
  };

  const handleDisplayRetweetedPosts = () => {
    setIsRetweetedActive(true);
    setIsLikesActive(false);
    setIsEntriesActive(false);
  };

  const fetchSearchedProfile = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/users/${name}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      const result = response.data;
      console.log(result);
      if (!result.data.isMe) setCurrentProfile(result.data);
      else setCurrentProfile({});
    } catch (error) {
      console.error("Wystąpił błąd przy pobieraniu danych:", error);
      setCurrentProfile({});
    }
  };

  useEffect(() => {
    fetchSearchedProfile();
  }, [name]);

  return (
    <section className="user-profile">
      <img className="user-profile__img" src={currentProfile?.avatar} alt="" />
      <button
        onClick={() =>
          currentProfile.isFollowing === true
            ? handleToggleFollow(
                currentProfile._id,
                "unfollow",
                fetchSearchedProfile
              )
            : handleToggleFollow(
                currentProfile._id,
                "follow",
                fetchSearchedProfile
              )
        }
        className={`user-profile__follow-btn ${
          currentProfile.isFollowing ? "user-profile__follow-btn--followed" : ""
        }`}
      >
        {currentProfile.isFollowing === true ? "Unfollow" : "Follow"}
      </button>
      <div className="user-profile__info">
        <h2 className="user-profile__name">{currentProfile?.username}</h2>
        <p className="user-profile__description">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde
          inventore quis officia ullam autem soluta sed quibusdam temporibus
          cupiditate, nemo tempore ratione, saepe omnis aut debitis ad magni,
          obcaecati deserunt!
        </p>
        <div className="user-profile__follows-wrapper">
          <span className="user-profile__following-number">
            Following: {currentProfile?.followingCount}
          </span>
          <span className="user-profile__followers-number">
            Followers: {currentProfile?.followersCount}
          </span>
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
          <div
            onClick={handleDisplayRetweetedPosts}
            className={`user-profile__post-type ${
              isRetweetedActive ? "user-profile__post-type--active" : ""
            }`}
          >
            Retweeted
          </div>
        </div>
        {isEntriesActive && (
          <Post
            isPostingActive={false}
            isCurrentProfileActive={true}
            currentProfilePosts={currentProfile.posts}
            fetchSearchedProfile={fetchSearchedProfile}
          />
        )}
        {isLikesActive && (
          <Post
            isPostingActive={false}
            isCurrentProfileActive={true}
            currentProfilePosts={currentProfile.posts}
          />
        )}
        {isRetweetedActive && (
          <Post
            isPostingActive={false}
            isCurrentProfileActive={true}
            currentProfilePosts={currentProfile.posts}
          />
        )}
      </div>
    </section>
  );
};

export default ProfileContent;
