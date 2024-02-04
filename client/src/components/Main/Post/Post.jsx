import React, { useEffect, useRef, useState } from "react";
import "./Post.scss";
import exampleImg from "../../../assets/example-image.jpg";
import profileUser from "../../../assets/profile-user.png";
import { FaRegHeart, FaShare, FaRegComment } from "react-icons/fa";
import { IoStatsChartSharp } from "react-icons/io5";
import {
  MdInsertPhoto,
  MdOutlineEmojiEmotions,
  MdOutlineFormatListBulleted,
  MdOutlineFormatListNumbered,
} from "react-icons/md";
import EmojiPicker from "emoji-picker-react";

const Post = () => {
  const [newPostText, setNewPostText] = useState("");
  const [isEmojiPickerActive, setIsEmojiPickerActive] = useState(false);
  const [listNumber, setListNumber] = useState(1);
  const textareaRef = useRef(null);

  const handleNewPostText = (event) => {
    setNewPostText(event.target.value);
  };

  const handleUploadImage = (event) => {
    document.querySelector("#img-upload").addEventListener("change", () => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
          const previewImage = document.getElementById("previewImage");
          previewImage.src = e.target.result;
        };

        reader.readAsDataURL(file);
      }
    });
  };

  const handleEmojiPicker = () => {
    setIsEmojiPickerActive((prevState) => !prevState);
  };

  const onEmojiClick = (emojiData) => {
    setNewPostText((prevState) => prevState + emojiData.emoji);
  };

  const handleBulletList = () => {
    setNewPostText((prevState) => prevState + `\n• `);
  };

  const handleNumberList = () => {
    setNewPostText((prevState) => prevState + `\n${listNumber}. `);
    setListNumber((prevNumber) => prevNumber + 1);
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const resizeTextarea = () => {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    };

    resizeTextarea();

    textarea.addEventListener("input", resizeTextarea);

    return () => {
      textarea.removeEventListener("input", resizeTextarea);
    };
  }, [newPostText]);

  return (
    <div className="post">
      <div className="new-post">
        <textarea
          id="autoresize"
          onChange={handleNewPostText}
          value={newPostText}
          ref={textareaRef}
          name="new-post"
          maxLength={280}
          className="new-post__text"
          placeholder="What's going on?!"
        ></textarea>
        <img src="" alt="" id="previewImage" />
        <div className="new-post__actions">
          <MdInsertPhoto
            onClick={() => document.querySelector("#img-upload").click()}
            className="new-post__image-upload"
          />
          <input
            onClick={handleUploadImage}
            className="hidden"
            type="file"
            id="img-upload"
            name=""
          />
          <div className="new-post__emoji-picker-container">
            <MdOutlineEmojiEmotions
              onClick={handleEmojiPicker}
              className="new-post__emoji-picker"
            />
            {isEmojiPickerActive && (
              <div>
                <EmojiPicker
                  onEmojiClick={onEmojiClick}
                  theme="dark"
                  className="emoji-picker"
                  emojiStyle="apple"
                />
              </div>
            )}
          </div>
          <MdOutlineFormatListBulleted
            onClick={handleBulletList}
            className="new-post__bullet-list"
          />
          <MdOutlineFormatListNumbered
            onClick={handleNumberList}
            className="new-post__numbered-list"
          />
          <button className="new-post__submit-post">Publish entry</button>
        </div>
      </div>
      <div className="post__author">
        <img
          className="post__profile-icon"
          src={profileUser}
          alt="img-ico"
        ></img>
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
    </div>
  );
};

export default Post;
