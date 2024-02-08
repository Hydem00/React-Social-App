import React, { useEffect, useRef, useState } from "react";

import {
  MdInsertPhoto,
  MdOutlineEmojiEmotions,
  MdOutlineFormatListBulleted,
  MdOutlineFormatListNumbered,
} from "react-icons/md";
import EmojiPicker from "emoji-picker-react";

import "./TextEditor.scss";

const TextEditor = ({ buttonText, placeholder, isModal }) => {
  const [newPostText, setNewPostText] = useState("");
  const [isEmojiPickerActive, setIsEmojiPickerActive] = useState(false);
  const [listNumber, setListNumber] = useState(1);
  const [isFocused, setIsFocused] = useState(false);
  const previewImageRef = useRef(null);
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  const handleNewPostText = (event) => {
    setNewPostText(event.target.value);
  };

  const handleUploadImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        const previewImage = previewImageRef.current;
        if (previewImage) {
          previewImage.src = e.target.result;
        }
      };

      reader.readAsDataURL(file);
    }
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

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const resizeTextarea = () => {
      textarea.style.height = "auto";
      textarea.style.height =
        (Number(textarea.scrollHeight) === 0 ? 72 : textarea.scrollHeight) +
        "px";
    };

    resizeTextarea();

    textarea.addEventListener("input", resizeTextarea);

    return () => {
      textarea.removeEventListener("input", resizeTextarea);
    };
  }, [newPostText]);

  return (
    <div className="text-editor">
      <textarea
        onFocus={handleFocus}
        onBlur={handleBlur}
        id="autoresize"
        onChange={handleNewPostText}
        value={newPostText}
        ref={textareaRef}
        name="new-post"
        maxLength={280}
        className={`text-editor__text ${
          isModal ? "text-editor__text--modal" : ""
        }`}
        placeholder={placeholder || "What's going on?!"}
      ></textarea>
      <img
        ref={previewImageRef}
        className="text-editor__img-preview"
        alt=""
        id="previewImage"
      />
      <div
        className={`text-editor__actions ${
          isModal ? "text-editor__actions--modal" : ""
        }`}
      >
        <MdInsertPhoto
          onClick={() => fileInputRef.current && fileInputRef.current.click()}
          className="text-editor__image-upload"
        />
        <input
          ref={fileInputRef}
          onChange={handleUploadImage}
          className="hidden"
          type="file"
          id="img-upload"
          name=""
        />
        <div className="text-editor__emoji-picker-container">
          <MdOutlineEmojiEmotions
            onClick={handleEmojiPicker}
            className="text-editor__emoji-picker"
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
          className="text-editor__bullet-list"
        />
        <MdOutlineFormatListNumbered
          onClick={handleNumberList}
          className="text-editor__numbered-list"
        />
        <button className="text-editor__submit-post">{buttonText}</button>
      </div>
    </div>
  );
};

export default TextEditor;
