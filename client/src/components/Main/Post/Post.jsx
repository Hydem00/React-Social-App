import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import TextEditor from "./TextEditor/TextEditor";
import Comments from "./Comments/Comments";
import "./Post.scss";
import { FaRegHeart, FaShare, FaRegComment } from "react-icons/fa";
import { IoStatsChartSharp } from "react-icons/io5";

const Post = ({
  isPostingActive,
  isCommentingActive,
  isPostingsBoard,
  postsData,
  isCurrentProfileActive,
  currentProfilePosts,
  fetchPosts,
  fetchSearchedProfile,
  currentPostData,
  fetchSearchedPost,
}) => {
  const navigate = useNavigate();

  const formatBase64Image = (base64String) =>
    `data:image/jpeg;base64,${base64String}`;

  const handleToggleLikePost = async (id, fetchFunc) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/posts/${id}/toggleLike`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      // console.log(response.data.data);
      fetchFunc();
    } catch (error) {
      console.error("There was a problem with the axios operation:", error);
    }
  };

  const handleToggleRetweetPost = async (id, isAlreadyRetweeted, fetchFunc) => {
    const isConfirmed = window.confirm(
      isAlreadyRetweeted
        ? "Are you sure you want to stop sharing this post?"
        : "Are you sure you want to share this post?"
    );
    if (isConfirmed) {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/posts/${id}/toggleRetweet`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );

        // console.log(response.data.data);
        fetchFunc();
      } catch (error) {
        console.error("There was a problem with the axios operation:", error);
      }
    }
  };

  return (
    <div className="posts">
      {isPostingActive && <TextEditor buttonText="Publish entry" />}
      {isPostingsBoard &&
        Array.isArray(postsData) &&
        postsData.map((post) => (
          <div className="post" key={post._id}>
            {/* <span className="flex items-center ml-3 mt-3 text-blue-500">
              <FaShare className="mx-1" /> Hydem retweeted
            </span> */}
            <div className="post__wrapper">
              <div className="post__author">
                <Link className="flex" to={`/profile/${post?.user?.username}`}>
                  <img
                    className="post__profile-icon"
                    src={post?.user?.avatar}
                    alt="img-ico"
                  ></img>

                  <span className="post__author-name">
                    {post?.user?.username}
                  </span>
                </Link>
              </div>
              <Link to={`/singlePost/${post?._id}`}>
                <p className="post__text" style={{ whiteSpace: "pre-wrap" }}>
                  {post?.caption}
                </p>
                <div className="post__img-wrapper">
                  {post?.files[0] && (
                    <img
                      className="post__img"
                      src={formatBase64Image(post?.files[0])}
                      alt="Post content"
                    />
                  )}
                </div>
              </Link>
              <div className="post__social-btns">
                <div className="post__social-btn-wrapper">
                  <FaRegHeart
                    onClick={() => handleToggleLikePost(post?._id, fetchPosts)}
                    className="btn-heart"
                  />
                  <span className="post__social--space">
                    {post?.likesCount}
                  </span>
                </div>
                <div className="post__social-btn-wrapper">
                  <FaRegComment
                    onClick={() => navigate(`/singlePost/${post?._id}`)}
                    className="btn-comment"
                  />
                  <span className="post__social--space">
                    {post?.commentsCount}
                  </span>
                </div>
                <div className="post__social-btn-wrapper">
                  <FaShare
                    onClick={() =>
                      handleToggleRetweetPost(
                        post?._id,
                        post?.isRetweeted,
                        fetchPosts
                      )
                    }
                    className="btn-share"
                  />
                  <span className="post__social--space">
                    {post?.retweetCount}
                  </span>
                </div>
                <div className="post__social-btn-wrapper">
                  <IoStatsChartSharp className="btn-stats" />
                  <span className="post__social--space">0</span>
                </div>
              </div>
            </div>
            {isCommentingActive && <Comments />}
          </div>
        ))}

      {isCurrentProfileActive &&
        Array.isArray(currentProfilePosts) &&
        currentProfilePosts.map((post) => (
          <div className="post" key={post._id}>
            <div className="post__wrapper">
              <div className="post__author">
                <Link className="flex" to={`/profile/${post?.user?.username}`}>
                  <img
                    className="post__profile-icon"
                    src={post?.user?.avatar}
                    alt="img-ico"
                  ></img>
                  <span className="post__author-name">
                    {post?.user?.username}
                  </span>
                </Link>
              </div>
              <Link to={`/singlePost/${post?._id}`}>
                <p className="post__text" style={{ whiteSpace: "pre-wrap" }}>
                  {post?.caption}
                </p>
                <div className="post__img-wrapper">
                  {post?.files[0] && (
                    <img
                      className="post__img"
                      src={formatBase64Image(post?.files[0])}
                      alt="Post content"
                    />
                  )}
                </div>
              </Link>
              <div className="post__social-btns">
                <div className="post__social-btn-wrapper">
                  <FaRegHeart
                    onClick={() =>
                      handleToggleLikePost(post?._id, fetchSearchedProfile)
                    }
                    className="btn-heart"
                  />
                  <span className="post__social--space">
                    {post?.likesCount}
                  </span>
                </div>
                <div className="post__social-btn-wrapper">
                  <FaRegComment
                    onClick={() => navigate(`/singlePost/${post?._id}`)}
                    className="btn-comment"
                  />
                  <span className="post__social--space">
                    {post?.commentsCount}
                  </span>
                </div>
                <div className="post__social-btn-wrapper">
                  <FaShare
                    onClick={() =>
                      handleToggleRetweetPost(
                        post?._id,
                        post?.isRetweeted,
                        fetchSearchedProfile
                      )
                    }
                    className="btn-share"
                  />
                  <span className="post__social--space">
                    {post?.retweetCount}
                  </span>
                </div>
                <div className="post__social-btn-wrapper">
                  <IoStatsChartSharp className="btn-stats" />
                  <span className="post__social--space">0</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      {isCommentingActive && (
        <div className="post" key={currentPostData?._id}>
          <div className="post__wrapper">
            <div className="post__author">
              <Link
                className="flex"
                to={`/profile/${currentPostData?.user?.username}`}
              >
                <img
                  className="post__profile-icon"
                  src={currentPostData?.user?.avatar}
                  alt="img-ico"
                ></img>
                <span className="post__author-name">
                  {currentPostData?.user?.username}
                </span>
              </Link>
            </div>
            <Link to={`/singlePost/${currentPostData?._id}`}>
              <p className="post__text" style={{ whiteSpace: "pre-wrap" }}>
                {currentPostData?.caption}
              </p>
              <div className="post__img-wrapper">
                {currentPostData?.files?.length > 0 &&
                  currentPostData?.files[0] !== "" && (
                    <img
                      className="post__img"
                      src={formatBase64Image(currentPostData.files[0])}
                      alt="Post content"
                    />
                  )}
              </div>
            </Link>
            <div className="post__social-btns">
              <div className="post__social-btn-wrapper">
                <FaRegHeart
                  onClick={() =>
                    handleToggleLikePost(
                      currentPostData?._id,
                      fetchSearchedPost
                    )
                  }
                  className="btn-heart"
                />
                <span className="post__social--space">
                  {currentPostData?.likesCount}
                </span>
              </div>
              <div className="post__social-btn-wrapper">
                <FaRegComment className="btn-comment" />
                <span className="post__social--space">
                  {currentPostData?.commentsCount}
                </span>
              </div>
              <div className="post__social-btn-wrapper">
                <FaShare
                  onClick={() =>
                    handleToggleRetweetPost(
                      currentPostData?._id,
                      currentPostData?.isRetweeted,
                      fetchSearchedPost
                    )
                  }
                  className="btn-share"
                />
                <span className="post__social--space">
                  {currentPostData?.retweetCount}
                </span>
              </div>
              <div className="post__social-btn-wrapper">
                <IoStatsChartSharp className="btn-stats" />
                <span className="post__social--space">0</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {isCommentingActive && (
        <Comments
          formatBase64Image={formatBase64Image}
          currentPostData={currentPostData}
          fetchSearchedPost={fetchSearchedPost}
        />
      )}
    </div>
  );
};

export default Post;
