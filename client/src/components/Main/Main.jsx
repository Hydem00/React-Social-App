import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Post from "./Post/Post";
import "./Main.scss";
import ProfileContent from "./ProfileContent/ProfileContent";
import SearchedProfiles from "./SearchedProfiles/SearchedProfiles";
import SinglePost from "./SinglePost/SinglePost";
import axios from "axios";

const Main = () => {
  const [postsData, setPostsData] = useState({});

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/users/feed/",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      setPostsData(response.data.data.filter((post) => !post.isMine));
      // console.log(response.data.data);
    } catch (error) {
      console.error("There was a problem with the axios operation:", error);
      setPostsData({});
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <main className="main">
      <section className="main__posts">
        <Routes>
          <Route
            path="/"
            element={
              <Post
                isPostingActive={true}
                isCommentingActive={false}
                isPostingsBoard={true}
                postsData={postsData}
                fetchPosts={fetchPosts}
              />
            }
          />
          <Route path="/profile/:name" element={<ProfileContent />} />
          <Route
            path="/searchedProfiles/:name"
            element={<SearchedProfiles />}
          />
          <Route path="/singlePost/:id" element={<SinglePost />} />
          {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
        </Routes>
      </section>
    </main>
  );
};

export default Main;
