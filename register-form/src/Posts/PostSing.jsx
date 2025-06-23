import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const PostSing = () => {
  const { id: postId } = useParams();
  const [post, setPost] = useState(null);
  const [postAuthor, setPostAuthor] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [userRating, setUserRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);


  useEffect(() => {
    const fetchPostData = async () => {
      try {
        setLoading(true);
        setError(null);


        const currentUserResponse = await fetch('http://localhost:3000/users/1');
        if (currentUserResponse.ok) {
          const userData = await currentUserResponse.json();
          setCurrentUser(userData);
        }


        const postResponse = await fetch(`http://localhost:3000/posts/${postId}`);
        if (!postResponse.ok) {
          throw new Error('Post not found');
        }
        const postData = await postResponse.json();
        

        const userResponse = await fetch(`http://localhost:3000/users/${postData.userId}`);
        const userData = userResponse.ok ? await userResponse.json() : null;
        

        const commentsResponse = await fetch(`http://localhost:3000/comments?postId=${postId}`);
        const commentsData = commentsResponse.ok ? await commentsResponse.json() : [];
        
        setPost(postData);
        setPostAuthor(userData);
        setComments(commentsData);
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (postId) {
      fetchPostData();
    }
  }, [postId]);

  const handleAddComment = async () => {
    if (newComment.trim() && userRating > 0) {
      try {

        const newCommentId = 'c' + Date.now();
        
        const comment = {
          id: newCommentId,
          postId: postId,
          userId: currentUser?.id || "1",
          author: currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : "Anonymous User",
          content: newComment,
          createdAt: new Date().toISOString()
        };
        
        console.log('Sending comment:', comment);
        

        const response = await fetch('http://localhost:3000/comments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(comment)
        });
        
        if (response.ok) {
          const savedComment = await response.json();
          console.log('Comment saved successfully:', savedComment);

          setComments(prev => [...prev, savedComment]);
          setNewComment('');
          setUserRating(0);
        } else {
          const errorText = await response.text();
          console.error('Failed to save comment:', response.status, errorText);
          alert('Failed to save comment. Please try again.');
        }
      } catch (err) {
        console.error('Failed to add comment:', err);
        alert('Error adding comment. Please try again.');
      }
    } else {
      alert('Please write a comment and select a rating before submitting.');
    }
  };

  const handleRatingClick = (rating) => {
    setUserRating(rating);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).replace(/\//g, '-');
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

      <div className="max-w-4xl mx-auto px-4 pb-8 p-5">

        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
          <div className="text-sm text-gray-600">
            <span>Author: {postAuthor ? `${postAuthor.firstName} ${postAuthor.lastName}` : post.author}</span>
            <span className="ml-8">Date: {formatDate(post.createdAt)}</span>
          </div>
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">

          <div className="bg-gray-600 aspect-video flex items-center justify-center text-white text-6xl font-light rounded">
            image
          </div>
          

          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              {post.description}
            </p>
            

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="bg-gray-200 px-3 py-1 rounded text-sm">
                  {comments.length}
                </span>
                <span className="text-sm text-gray-600">Comments</span>
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


        <div className="space-y-4 mb-8">
          {comments.map((comment) => (
            <div key={comment.id} className="flex space-x-4">

              <div className="w-12 h-12 bg-gray-600 rounded flex-shrink-0 flex items-center justify-center text-white text-sm">
                {comment.author.charAt(0).toUpperCase()}
              </div>
              

              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-1">
                  <span className="font-medium text-sm">{comment.author}</span>
                  <span className="text-xs text-gray-500">{formatDate(comment.createdAt)}</span>
                </div>
                <p className="text-sm text-gray-700 mb-2">{comment.content}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="bg-gray-200 px-2 py-1 rounded text-xs">
                      5.0
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

          {comments.length === 0 && (
            <div className="text-center py-4 text-gray-500">
              No comments yet. Be the first to comment!
            </div>
          )}
        </div>


        <div className="bg-[#EBEBEB] p-6 rounded">
          <div className="mb-4">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write your comment here..."
              className="w-full p-3 border border-gray-300 rounded resize-none h-24"
            />
          </div>
          

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