import React from "react";
import TextEditor from "./TextEditor/TextEditor";
import Comments from "./Comments/Comments";
import "./Post.scss";
import exampleImg from "../../../assets/example-image.jpg";
import profileUser from "../../../assets/profile-user.png";
import { FaRegHeart, FaShare, FaRegComment } from "react-icons/fa";
import { IoStatsChartSharp } from "react-icons/io5";

const Post = (props) => {
  return (
    <div className="post">
      {props.isPostingActive && <TextEditor buttonText="Publish entry" />}
      <div className="post__wrapper">
        <a href="#">
          <div className="post__author">
            <img
              className="post__profile-icon"
              src={profileUser}
              alt="img-ico"
            ></img>
            <a className="post__author-name">Lorem ipsum</a>
          </div>
          <p className="post__text">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Dignissimos cum aliquid optio recusandae repudiandae sequi
            reiciendis ea vitae maxime voluptatem repellat unde officia, aut
            ipsum! Aliquam consequuntur eligendi nemo nostrum.
          </p>
          <div className="post__img-wrapper">
            <img className="post__img" src={exampleImg} alt="" />
          </div>
          <div className="post__social-btns">
            <div className="post__social-btn-wrapper">
              <FaRegHeart className="btn-heart" />
              <span className="post__social--space">0</span>
            </div>
            <div className="post__social-btn-wrapper">
              <FaRegComment className="btn-comment" />
              <span className="post__social--space">0</span>
            </div>
            <div className="post__social-btn-wrapper">
              <FaShare className="btn-share" />
            </div>
            <div className="post__social-btn-wrapper">
              <IoStatsChartSharp className="btn-stats" />
              <span className="post__social--space">0</span>
            </div>
          </div>
        </a>
      </div>
      {props.isCommentingActive && <Comments />}
    </div>
  );
};

export default Post;
