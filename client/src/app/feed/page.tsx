"use client"
import React from "react";
import Image from "next/image";
import axios from "axios";

export default function Feed() {
  const [posts, setPosts] = React.useState([]);

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
    <div className="grid grid-cols-3 gap-4 overflow-scroll">
      {posts.map(post => (
        <div key="helo" className="max-w-sm rounded overflow-hidden shadow-lg m-2">
          <Image className="w-full" src='/favicon' alt="helo" width={500} height={500} objectFit="cover" />
          <div className="px-6 py-4">
            <p className="text-gray-700 text-base">"heqd</p>
          </div>
        </div>
      ))}
    </div>
  );
}