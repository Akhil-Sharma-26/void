"use client"
import React from "react";
import Image from "next/image";
import axios from "axios";

export default function Feed() {
  // const [posts, setPosts] = React.useState([]);

  // React.useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       const response = await axios.get('/api/posts');
  //       setPosts(response.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchPosts();
  // }, []);

  return (
    <div className="flex flex-col items-center min-w-full">
      <div className="min-w-full flex flex-col items-center min-h-screen">
        <h1 className="text-4xl font-mono p-5 font-bold ">Feed</h1>
        <hr />
        <div>
          <p className="text-xl font-mono pb-5">Welcome to the feed</p>
        </div>
        <hr /> 
      </div>
    </div>
  );
}