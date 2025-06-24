import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Posts() {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const API_URL = "https://zhanel-blog.onrender.com/api/posts";
  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await axios.get(API_URL);
        setPosts(res.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setIsLoading(false);
      }
    }
    fetchPosts();
  }, []);

  return (
    <>
      <div>
        {/* Posts List */}
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white shadow-lg rounded-xl p-6">
              <h2 className="text-xl font-bold mb-2">
                <Link to={`/posts/${post.id}`} className="hover:text-blue-500">
                  {post.title}
                </Link>
              </h2>
              <p className="text-gray-600 mb-2">{post.description}</p>
              <p className="text-sm text-gray-500">Author: {post.author}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
