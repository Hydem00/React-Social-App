import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Post from "../Post/Post";

const SinglePost = () => {
  const { id } = useParams();
  const [currentPostData, setCurrentPostData] = useState({});

  const fetchSearchedPost = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/posts/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      const result = response.data;
      console.log(result);
      if (!result.data.isMine) setCurrentPostData(result.data);
      else setCurrentPostData({});
    } catch (error) {
      console.error("Wystąpił błąd przy pobieraniu danych:", error);
      setCurrentPostData({});
    }
  };

  useEffect(() => {
    fetchSearchedPost();
  }, [id]);
  return (
    <Post
      isCommentingActive={true}
      currentPostData={currentPostData}
      fetchSearchedPost={fetchSearchedPost}
    />
  );
};

export default SinglePost;
