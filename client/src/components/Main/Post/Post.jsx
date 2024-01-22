import React from "react";
import "./Post.scss";
import exampleImg from "../../../assets/example-image.jpg";
import profileUser from "../../../assets/profile-user.png";
import { FaRegHeart, FaShare, FaRegComment } from "react-icons/fa";
import { IoStatsChartSharp } from "react-icons/io5";

const Post = (props) => {
  return (
    <div className="post">
      <div className="post__author">
        <img className="post__profile-icon" src={profileUser}></img>
        <a className="post__author-name">Lorem ipsum</a>
      </div>
      <p className="post__text">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos
        cum aliquid optio recusandae repudiandae sequi reiciendis ea vitae
        maxime voluptatem repellat unde officia, aut ipsum! Aliquam consequuntur
        eligendi nemo nostrum.
      </p>
      <div className="post__img-wrapper">
        <img className="post__img" src={exampleImg} alt="" />
      </div>
      <hr />
      <div className="post__social-btns">
        <FaRegHeart />
        <FaRegComment />
        <FaShare />
        <IoStatsChartSharp />
      </div>
    </div>
  );
};

export default Post;
