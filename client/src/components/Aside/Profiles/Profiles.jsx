import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Profiles.scss";
import profileUser from "../../../assets/profile-user.png";
import { StoreContext } from "../../store/StoreProvider";

const Profiles = ({
  isAside,
  trendingProfiles,
  fetchTrendingProfiles,
  isSearchingModal,
  searchedProfiles,
  searchProfiles,
  isSearchedProfileActive,
  closeModal,
  fetchProfiles,
  fetchSearchedProfiles,
}) => {
  const { handleToggleFollow } = useContext(StoreContext);
  return (
    <section
      className={`profiles ${
        isAside || isSearchingModal ? "" : "profiles--separate-subpage"
      } ${isSearchingModal ? "bg-black" : ""}`}
    >
      {isAside ? (
        <h3 className="profiles__title">Profiles worth following</h3>
      ) : (
        ""
      )}
      {isAside &&
        Array.isArray(trendingProfiles) &&
        trendingProfiles.map((profile, index) => (
          <div
            className="profile border-[#2E3235] border-b-1"
            key={profile._id}
          >
            <img className="profile__icon" src={profile.avatar} alt="" />
            <Link to={`/profile/${profile.username}`} className="profile__name">
              {profile.username}
            </Link>
            <button
              onClick={() =>
                profile.isFollowing === true
                  ? handleToggleFollow(
                      profile?._id,
                      "unfollow",
                      fetchTrendingProfiles
                    )
                  : handleToggleFollow(
                      profile?._id,
                      "follow",
                      fetchTrendingProfiles
                    )
              }
              className={`profile__follow-btn ${
                profile.isFollowing ? "profile__follow-btn--followed" : ""
              }`}
            >
              {profile.isFollowing === true ? "Unfollow" : "Follow"}
            </button>
            <div className="profile__follows-wrapper">
              <span className="profile__following-number">
                Following: {profile.followingCount}
              </span>
              <span className="profile__followers-number">
                Followers: {profile.followersCount}
              </span>
            </div>
          </div>
        ))}
      {isSearchingModal &&
        searchProfiles.map((profile, index) => (
          <div
            className="profile profile--modal"
            key={`search-${profile.id || index}`}
          >
            <img
              className="profile__icon"
              src={profile.avatar || profileUser}
              alt=""
            />
            <Link
              onClick={closeModal}
              to={`/profile/${profile?.username}`}
              className="profile__name"
            >
              {profile?.username}
            </Link>
            <button
              onClick={() =>
                profile.isFollowing === true
                  ? handleToggleFollow(profile?._id, "unfollow", fetchProfiles)
                  : handleToggleFollow(profile?._id, "follow", fetchProfiles)
              }
              className={`profile__follow-btn ${
                profile.isFollowing ? "profile__follow-btn--followed" : ""
              }`}
            >
              {profile.isFollowing === true ? "Unfollow" : "Follow"}
            </button>
            <div className="profile__follows-wrapper">
              <span className="profile__following-number">
                Following: {profile?.followingCount}
              </span>
              <span className="profile__followers-number">
                Followers: {profile?.followersCount}
              </span>
            </div>
            <p className="profile__description">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi,
              corporis! Quasi, ea ad ut eligendi assumenda officia quod ratione
              iure, placeat ipsum delectus temporibus natus, veniam maxime?
              Quod, quia doloribus!
            </p>
          </div>
        ))}

      {isSearchedProfileActive && (
        <div className="profile">
          <img
            className="profile__icon"
            src={searchedProfiles?.avatar}
            alt=""
          />
          <Link
            to={`/profile/${searchedProfiles?.username}`}
            className="profile__name"
          >
            {searchedProfiles?.username}
          </Link>
          <button
            onClick={() =>
              searchedProfiles.isFollowing === true
                ? handleToggleFollow(
                    searchedProfiles?._id,
                    "unfollow",
                    fetchSearchedProfiles
                  )
                : handleToggleFollow(
                    searchedProfiles?._id,
                    "follow",
                    fetchSearchedProfiles
                  )
            }
            className={`profile__follow-btn ${
              searchedProfiles.isFollowing
                ? "profile__follow-btn--followed"
                : ""
            }`}
          >
            {searchedProfiles.isFollowing === true ? "Unfollow" : "Follow"}
          </button>
          <div className="profile__follows-wrapper">
            <span className="profile__following-number">
              Following: {searchedProfiles?.followingCount}
            </span>
            <span className="profile__followers-number">
              Followers: {searchedProfiles?.followersCount}
            </span>
          </div>
          <p className="profile__description">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi,
            corporis! Quasi, ea ad ut eligendi assumenda officia quod ratione
            iure, placeat ipsum delectus temporibus natus, veniam maxime? Quod,
            quia doloribus!
          </p>
        </div>
      )}
    </section>
  );
};

export default Profiles;
