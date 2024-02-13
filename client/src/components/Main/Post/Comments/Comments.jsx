import React from "react";
import { Link } from "react-router-dom";
import TextEditor from "../TextEditor/TextEditor";
import "./Comments.scss";

const Comments = ({
  currentPostData,
  formatBase64Image,
  fetchSearchedPost,
}) => {
  return (
    <section className="comments">
      <TextEditor
        addComment={true}
        fetchSearchedPost={fetchSearchedPost}
        buttonText="Reply"
        placeholder="Publish your answer"
      />
      {currentPostData?.comments?.length > 0 &&
        currentPostData.comments.map((comment) => (
          <div className="comment" key={comment?._id}>
            <div className="comments__author">
              <Link className="flex" to={`/profile/${comment?.user?.username}`}>
                <img
                  src={comment?.user?.avatar}
                  alt=""
                  className="comments__profile-icon"
                />
                <span className="comments__author-name">
                  {comment?.user?.username}
                </span>
                <div className="comments__img-wrapper">
                  {comment?.files?.length > 0 && (
                    <img
                      className="comments__img"
                      src={formatBase64Image(comment.files[0])}
                      alt="Post content"
                    />
                  )}
                </div>
              </Link>
            </div>
            <p className="comments__text" style={{ whiteSpace: "pre-wrap" }}>
              {comment?.text}
            </p>
          </div>
        ))}
    </section>
  );
};

export default Comments;
