import React, { useContext } from "react";
import TextEditor from "../Main/Post/TextEditor/TextEditor";
import { StoreContext } from "../store/StoreProvider";
import SearchProfiles from "./SearchProfiles/SearchProfiles";

const Modal = ({ isOpen, onClose }) => {
  const { isPublishPostActive, isSearchActive } = useContext(StoreContext);

  return (
    <>
      <div
        id="medium-modal"
        tabIndex="-1"
        className={`fixed top-0 left-0 right-0 z-50 ${
          isOpen ? "flex items-center justify-center" : "hidden"
        } w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] h-screen bg-[rgba(118,114,114,0.5)]`}
      >
        <div className="relative w-full max-w-lg max-h-full">
          <div className="relative bg-black rounded-lg shadow dark:bg-black-900">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Publish New Post
              </h3>
              <button
                onClick={onClose}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-4 md:p-5 space-y-4">
              {isPublishPostActive && (
                <TextEditor buttonText="Publish" isModal={true} />
              )}
              {isSearchActive && <SearchProfiles />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
