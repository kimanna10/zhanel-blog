import React, { useState, useEffect } from 'react';
import { ChevronRight, Star } from 'lucide-react';

const PostSing = ({ postId = "1" }) => {
  const [post, setPost] = useState(null);
  const [postAuthor, setPostAuthor] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [userRating, setUserRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch post data from JSON server
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch the specific post
        const postResponse = await fetch(`http://localhost:3000/posts/${postId}`);
        if (!postResponse.ok) {
          throw new Error('Post not found');
        }
        const postData = await postResponse.json();
        
        // Fetch the author details
        const userResponse = await fetch(`http://localhost:3000/users/${postData.userId}`);
        const userData = userResponse.ok ? await userResponse.json() : null;
        
        setPost(postData);
        setPostAuthor(userData);
        
        // For now, we'll simulate comments since they're not in your db.json
        // You can add a comments collection to your db.json later
        setComments([
          {
            id: 1,
            author: userData?.username || "user123",
            date: "21-05-2025",
            text: "This is a great post! Thanks for sharing your thoughts on this topic. I found it very helpful and informative.",
            rating: 4.5,
            postId: postId
          },
          {
            id: 2,
            author: "guest_user",
            date: "20-05-2025",
            text: "Interesting perspective. I have a different view on some points but overall a good read. Looking forward to more content like this.",
            rating: 4.0,
            postId: postId
          }
        ]);
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPostData();
  }, [postId]);

  const handleAddComment = async () => {
    if (newComment.trim() && userRating > 0) {
      try {
        // In a real app, you would POST this to your server
        // For now, we'll just add it to local state
        const comment = {
          id: Date.now(), // Simple ID generation
          author: "currentUser", // This would come from auth context
          date: new Date().toLocaleDateString('en-GB').replace(/\//g, '-'),
          text: newComment,
          rating: userRating,
          postId: postId
        };
        
        setComments(prev => [...prev, comment]);
        setNewComment('');
        setUserRating(0);
        
        // TODO: Implement actual API call to save comment
        console.log('Comment to save:', comment);
      } catch (err) {
        console.error('Failed to add comment:', err);
      }
    }
  };

  const handleRatingClick = (rating) => {
    setUserRating(rating);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded mb-4"></div>
            <div className="h-64 bg-gray-300 rounded mb-4"></div>
            <div className="h-4 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 bg-gray-300 rounded mb-2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <h2 className="font-bold">Error loading post</h2>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-8">
            <p className="text-gray-600">Post not found</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 pb-8 p-5">
        {/* Post Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
          <div className="text-sm text-gray-600">
            <span>Author: {postAuthor ? `${postAuthor.firstName} ${postAuthor.lastName}` : post.author}</span>
            <span className="ml-8">Date: {new Date().toLocaleDateString('en-GB', {
              day: '2-digit',
              month: '2-digit', 
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            }).replace(/\//g, '-')}</span>
          </div>
        </div>

        {/* Post Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Image */}
          <div className="bg-gray-600 aspect-video flex items-center justify-center text-white text-6xl font-light rounded">
            image
          </div>
          
          {/* Description */}
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              {post.description}
            </p>
            
            {/* Comments Count */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="bg-gray-200 px-3 py-1 rounded text-sm">
                  {comments.length}
                </span>
                <span className="text-sm text-gray-600">Comments</span>
              </div>
              <button 
                onClick={handleAddComment}
                className="bg-[#717171] text-white px-6 py-2 rounded hover:bg-gray-700"
              >
                Add comment
              </button>
            </div>
          </div>
        </div>

            {/* Comments Section */}
        <div className="space-y-4 mb-8">
          {comments.map((comment) => (
            <div key={comment.id} className="flex space-x-4">
              {/* Avatar */}
              <div className="w-12 h-12 bg-gray-600 rounded flex-shrink-0 flex items-center justify-center text-white text-sm">
                {comment.author.charAt(0).toUpperCase()}
              </div>
              
              {/* Comment Content */}
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-1">
                  <span className="font-medium text-sm">{comment.author}</span>
                  <span className="text-xs text-gray-500">{comment.date}</span>
                </div>
                <p className="text-sm text-gray-700 mb-2">{comment.text}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="bg-gray-200 px-2 py-1 rounded text-xs">
                      {comment.rating.toFixed(1)}
                    </span>
                    <span className="text-xs text-gray-600">Rating</span>
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-xs text-gray-600 hover:text-gray-800">Edit</button>
                    <button className="text-xs text-gray-600 hover:text-gray-800">Delete</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Comment Form */}
        <div className="bg-[#EBEBEB] p-6 rounded">
          <div className="mb-4">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write your comment here..."
              className="w-full p-3 border border-gray-300 rounded resize-none h-24"
            />
          </div>
          
          {/* Rating Selection */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => handleRatingClick(rating)}
                  className={`px-3 py-1 rounded text-sm ${
                    userRating === rating 
                      ? 'bg-gray-600 text-white' 
                      : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                  }`}
                >
                  {rating}.0
                </button>
              ))}
              <span className="text-sm text-gray-600 ml-2">Rating</span>
            </div>
            
            <button 
              onClick={handleAddComment}
              disabled={!newComment.trim() || userRating === 0}
              className="bg-[#717171] text-white px-6 py-2 rounded hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Add comment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostSing;
