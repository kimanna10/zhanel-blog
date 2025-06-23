import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function PostsList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = "http://localhost:3000/posts";
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await axios.get(API_URL);
        setPosts(res.data);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching posts:", error.message);
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);


  const handlePost = () => {
    navigate("/create")
  }

  const handleMore = () => {
    navigate("/post/:id")
  }
 
  const getFormattedDate = () => {
    return new Date()
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
      .replace(",", "");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-gray-600">Loading posts...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <button onClick={handlePost}
      className="w-max bg-[#E3E3E3] hover:bg-[#D9D9D9] ">
        Create Post
      </button>
      <div className="max-w-4xl mx-auto space-y-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-lg shadow-sm overflow-hidden"
          >
            <div className="flex">
              <div className="w-80 h-48 flex items-center justify-center flex-shrink-0">
                <div className="text-white text-4xl font-light tracking-wider">
                  <img
                    src='/img.png'
                    alt= "image"
                    className="w-73"
                  />
                </div>
              </div>

              {/* Author and Date */}
              <div className="flex-1 p-6">
                <div className="flex justify-between text-sm text-gray-500 mb-3">
                  <span>Author: {post.author}</span>
                  <span>Date: {getFormattedDate()}</span>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {post.title}
                </h2>

                {/* Description */}
                <p className="text-gray-700 leading-relaxed mb-6">
                  {post.description}
                </p>

                {/* Rating, comments*/}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <span className="bg-gray-200 px-3 py-1 rounded text-sm font-medium">
                        5.0
                      </span>
                      <span className="text-gray-600 text-sm">Rating</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="bg-gray-200 px-3 py-1 rounded text-sm font-medium">
                        10
                      </span>
                      <span className="text-gray-600 text-sm">Comments</span>
                    </div>
                  </div>

                  <button
                  onClick={handleMore}
                  className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded text-sm font-medium text-gray-700 transition-colors">
                    View more
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {posts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">No posts found</div>
          </div>
        )}
      </div>
    </div>
  );
}