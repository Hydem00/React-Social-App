import React from "react";
import TextEditor from "../TextEditor/TextEditor";
import "./Comments.scss";
import profileUser from "../../../../assets/profile-user.png";

const Comments = () => {
  return (
    <section className="comment">
      <TextEditor buttonText="Reply" placeholder="Publish your answer" />
      <div className="comment__author">
        <img src={profileUser} alt="" className="comment__profile-icon" />
        <a className="comment__author-name">Lorem Ipsum</a>
      </div>
      <p className="comment__text">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos
        cum aliquid optio recusandae repudiandae sequi reiciendis ea vitae
        maxime voluptatem repellat unde officia, aut ipsum! Aliquam consequuntur
        eligendi nemo nostrum.
      </p>
    </section>
  );
};

export default Comments;
