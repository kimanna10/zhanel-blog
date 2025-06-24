import {
  ArrowLeft,
  Calendar,
  Edit,
  MessageSquare,
  ThumbsUp,
  Trash2,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function PostUser() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No authentication token found. Please log in.");
          setLoading(false);
          return;
        }

        const currentUserData = localStorage.getItem("user");
        if (currentUserData) {
          const userData = JSON.parse(currentUserData);
          setCurrentUserId(userData.id);
        }

        const userResponse = await fetch(
          `https://zhanel-blog.onrender.com/api/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!userResponse.ok) {
          throw new Error("Failed to fetch user data");
        }

        const userData = await userResponse.json();
        setUser(userData);

        const postsResponse = await fetch(
          `https://zhanel-blog.onrender.com/api/posts/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!postsResponse.ok) {
          throw new Error("Failed to fetch posts");
        }

        const postsData = await postsResponse.json();
        setPosts(postsData.posts || []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user posts:", err);
        setError(err.message || "Failed to load posts");
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserPosts();
    }
  }, [userId]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleEditPost = (postId) => {
    navigate(`/posts/edit/${postId}`);
  };

  const handleDeletePost = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://zhanel-blog.onrender.com/api/posts/${postId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setPosts(posts.filter((post) => post.id !== postId));
      } else {
        throw new Error("Failed to delete post");
      }
    } catch (err) {
      console.error("Error deleting post:", err);
      alert("Failed to delete post. Please try again.");
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 pt-16 flex items-center justify-center">
        <div className="text-xl text-zinc-600">Loading posts...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-50 pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl text-red-600 mb-4">{error}</div>
          <button
            onClick={handleBackClick}
            className="bg-zinc-600 text-white px-6 py-2 rounded hover:bg-zinc-700 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 pt-16">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={handleBackClick}
            className="mb-4 bg-zinc-600 text-white px-4 py-2 rounded hover:bg-zinc-700 flex items-center gap-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <div className="bg-white rounded-lg p-6 shadow-md">
            <h1 className="text-3xl font-bold text-zinc-800 mb-2">
              {user
                ? `${user.firstName} ${user.lastName}'s Posts`
                : "User Posts"}
            </h1>
            <p className="text-zinc-600">
              {posts.length} {posts.length === 1 ? "post" : "posts"} found
            </p>
          </div>
        </div>

        {/* Posts List */}
        <div className="space-y-6">
          {posts.length === 0 ? (
            <div className="bg-white rounded-lg p-8 shadow-md text-center">
              <p className="text-zinc-600 text-lg">No posts found.</p>
              {currentUserId === parseInt(userId) && (
                <button
                  onClick={() => navigate("/posts/create")}
                  className="mt-4 bg-zinc-600 text-white px-6 py-2 rounded hover:bg-zinc-700 transition-colors"
                >
                  Create Your First Post
                </button>
              )}
            </div>
          ) : (
            posts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-zinc-800 mb-2">
                      {post.title}
                    </h2>
                    <div className="flex items-center text-sm text-zinc-500 gap-4 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(post.createdAt)}
                      </div>
                      {post.commentsCount !== undefined && (
                        <div className="flex items-center gap-1">
                          <MessageSquare className="w-4 h-4" />
                          {post.commentsCount} comments
                        </div>
                      )}
                      {post.likesCount !== undefined && (
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="w-4 h-4" />
                          {post.likesCount} likes
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action buttons - only show if it's the current user's posts */}
                  {currentUserId === parseInt(userId) && (
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleEditPost(post.id)}
                        className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors"
                        title="Edit post"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeletePost(post.id)}
                        className="bg-red-600 text-white p-2 rounded hover:bg-red-700 transition-colors"
                        title="Delete post"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                <div className="text-zinc-700 mb-4">
                  <p className="line-clamp-3">
                    {post.content?.length > 200
                      ? `${post.content.substring(0, 200)}...`
                      : post.content}
                  </p>
                </div>

                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-zinc-100 text-zinc-700 px-3 py-1 rounded-full text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex justify-between items-center pt-4 border-t border-zinc-200">
                  <div className="text-sm text-zinc-500">
                    {post.updatedAt && post.updatedAt !== post.createdAt && (
                      <span>Last updated: {formatDate(post.updatedAt)}</span>
                    )}
                  </div>
                  <button
                    onClick={() => navigate(`/posts/${post.id}`)}
                    className="bg-zinc-600 text-white px-4 py-2 rounded hover:bg-zinc-700 transition-colors"
                  >
                    Read More
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
