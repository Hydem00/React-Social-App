import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";

import {
  MdInsertPhoto,
  MdOutlineEmojiEmotions,
  MdOutlineFormatListBulleted,
  MdOutlineFormatListNumbered,
} from "react-icons/md";
import EmojiPicker from "emoji-picker-react";

import "./TextEditor.scss";
import { StoreContext } from "../../../store/StoreProvider";
import { useParams } from "react-router-dom";

const TextEditor = ({
  buttonText,
  placeholder,
  isModal,
  addComment,
  fetchSearchedPost,
}) => {
  const [textareaText, setNewTextareaText] = useState("");
  const { setIsPostWarningActive } = useContext(StoreContext);
  const [newImage, setNewImage] = useState("");
  const [isEmojiPickerActive, setIsEmojiPickerActive] = useState(false);
  const [listNumber, setListNumber] = useState(1);
  const [isFocused, setIsFocused] = useState(false);
  const previewImageRef = useRef(null);
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);
  const { id } = useParams();

  const handlePublishPost = async () => {
    if (textareaText.length > 0) {
      setIsPostWarningActive(false);
      try {
        const response = await axios.post(
          "http://localhost:3001/api/posts/",
          {
            caption: textareaText,
            files: newImage,
            tags: "",
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );

        const result = response.data;
        // console.log(result);

        if (result.success) {
          setNewTextareaText("");
          setNewImage("");
          setListNumber(1);
        }

        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }

        if (previewImageRef.current) {
          previewImageRef.current.src = "";
        }
      } catch (error) {
        console.error("There was a problem with the axios operation:", error);
      }
    } else {
      setIsPostWarningActive(true);
    }
  };

  const handlePublishComment = async () => {
    console.log("comment");
    if (textareaText.length > 0) {
      setIsPostWarningActive(false);
      try {
        const response = await axios.post(
          `http://localhost:3001/api/posts/${id}/comments`,
          {
            text: textareaText,
            files: "",
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );

        const result = response.data;
        console.log(result);

        if (result.success) {
          setNewTextareaText("");
          setNewImage("");
          setListNumber(1);
          fetchSearchedPost();
        }

        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }

        if (previewImageRef.current) {
          previewImageRef.current.src = "";
        }
      } catch (error) {
        console.error("There was a problem with the axios operation:", error);
      }
    } else {
      setIsPostWarningActive(true);
    }
  };

  const handleNewPostText = (event) => {
    setNewTextareaText(event.target.value);
  };

  const handleUploadImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        const binaryData = e.target.result;
        console.log(binaryData);

        const binaryArray = new Uint8Array(binaryData);
        // console.log("Dane binarne jako Uint8Array:", binaryArray);

        const base64String = arrayBufferToBase64(binaryData);
        // console.log("Dane binarne jako base64:", base64String);

        setNewImage(base64String);

        const previewImage = previewImageRef.current;
        if (previewImage) {
          previewImage.src = `data:image/jpeg;base64,${base64String}`;
        }
      };

      reader.readAsArrayBuffer(file);
    }
  };

  function arrayBufferToBase64(buffer) {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  const handleEmojiPicker = () => {
    setIsEmojiPickerActive((prevState) => !prevState);
  };

  const onEmojiClick = (emojiData) => {
    setNewTextareaText((prevState) => prevState + emojiData.emoji);
  };

  const handleBulletList = () => {
    setNewTextareaText((prevState) => prevState + `\n• `);
  };

  const handleNumberList = () => {
    setNewTextareaText((prevState) => prevState + `\n${listNumber}. `);
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

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        handleBlur();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      textarea.removeEventListener("input", resizeTextarea);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [textareaText]);

  return (
    <div className="text-editor">
      <textarea
        id="autoresize"
        onChange={handleNewPostText}
        onFocus={handleFocus}
        value={textareaText}
        ref={textareaRef}
        name="new-post"
        maxLength={280}
        className={`text-editor__text ${
          !isFocused ? "text-editor__text--blur" : ""
        } ${isModal ? "text-editor__text--modal" : ""}`}
        placeholder={placeholder || "What's going on?!"}
      ></textarea>
      {!isFocused && (
        <button
          onClick={() =>
            !addComment ? handlePublishPost() : handlePublishComment()
          }
          className="text-editor__submit-post text-editor__submit-post--blur"
        >
          {buttonText}
        </button>
      )}
      <img
        ref={previewImageRef}
        className="text-editor__img-preview"
        alt=""
        id="previewImage"
      />
      {isFocused && (
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
          <button
            onClick={() =>
              !addComment ? handlePublishPost() : handlePublishComment()
            }
            className="text-editor__submit-post"
          >
            {buttonText}
          </button>
        </div>
      )}
    </div>
  );
};

export default TextEditor;
