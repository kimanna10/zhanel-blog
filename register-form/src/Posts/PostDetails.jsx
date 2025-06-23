// // PostDetails.jsx
// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function PostDetails() {
//   const { id } = useParams();
//   const [post, setPost] = useState(null);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [editedPost, setEditedPost] = useState({});
//   const [isLoading, setIsLoading] = useState(true);
//   const navigate = useNavigate();
//   // const API_URL = "http://192.168.10.83:5167/posts";
//   const API_URL = 'http://localhost:5167/posts';

//   useEffect(() => {
//     async function fetchPost() {
//       try {
//         const res = await axios.get(`${API_URL}/${id}`);
//         setPost(res.data);
//         setEditedPost(res.data);
//         setIsLoading(false);
//       } catch (error) {
//         console.error("Error fetching post:", error.message);
//         navigate("/posts"); 
//       }
//     }
//     fetchPost();
//   }, [id, navigate]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditedPost(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put(`${API_URL}/${id}`, editedPost);
//       setPost(editedPost);
//       setIsEditModalOpen(false);
//     } catch (error) {
//       console.error("Error updating post:", error);
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       await axios.delete(`${API_URL}/${id}`);
//       navigate("/posts");
//     } catch (error) {
//       console.error("Error deleting post:", error);
//     }
//   };

//   if (isLoading) return <div>Loading...</div>;

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
//       <div className="bg-white shadow-lg rounded-xl p-6 max-w-md w-full">
//         <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
//         <p className="text-gray-600 mb-4">{post.description}</p>
//         <p className="text-sm text-gray-500">Author: {post.author}</p>
//         <div className="flex space-x-3 mt-4">
//           <button
//             onClick={() => setIsEditModalOpen(true)}
//             className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
//           >
//             Edit Post
//           </button>
//           <button
//             onClick={handleDelete}
//             className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
//           >
//             Delete Post
//           </button>
//         </div>
//       </div>

//       {/* Edit Modal */}
//       {isEditModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg p-6 w-full max-w-md">
//             <h2 className="text-xl font-bold mb-4">Edit Post</h2>
//             <form onSubmit={handleSubmit}>
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Title</label>
//                   <input
//                     type="text"
//                     name="title"
//                     value={editedPost.title || ''}
//                     onChange={handleInputChange}
//                     className="mt-1 block w-full border border-gray-300 rounded-md p-2"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Description</label>
//                   <textarea
//                     name="description"
//                     value={editedPost.description || ''}
//                     onChange={handleInputChange}
//                     className="mt-1 block w-full border border-gray-300 rounded-md p-2"
//                     required
//                   ></textarea>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Author</label>
//                   <input
//                     type="text"
//                     name="author"
//                     value={editedPost.author || ''}
//                     onChange={handleInputChange}
//                     className="mt-1 block w-full border border-gray-300 rounded-md p-2"
//                     required
//                   />
//                 </div>
//               </div>
//               <div className="mt-6 flex justify-end space-x-3">
//                 <button
//                   type="button"
//                   onClick={() => setIsEditModalOpen(false)}
//                   className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
//                 >
//                   Save Changes
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



// PostDetails.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedPost, setEditedPost] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [authors, setAuthors] = useState([]);
  const navigate = useNavigate();
  const API_URL = 'http://localhost:5167/posts';
  const USERS_URL = 'http://localhost:5167/users'; // URL to fetch users from your JSON server

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch post data
        const postRes = await axios.get(`${API_URL}/${id}`);
        setPost(postRes.data);
        setEditedPost(postRes.data);
        
        // Fetch authors data
        const usersRes = await axios.get(USERS_URL);
        setAuthors(usersRes.data);
        
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        navigate("/posts"); 
      }
    }
    fetchData();
  }, [id, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPost(prev => ({ ...prev, [name]: value }));
  };

  const handleAuthorChange = (e) => {
    const selectedUserId = e.target.value;
    const selectedAuthor = authors.find(author => author.id === selectedUserId);
    const authorName = selectedAuthor ? `${selectedAuthor.firstName} ${selectedAuthor.lastName}` : '';
    
    setEditedPost(prev => ({
      ...prev,
      author: authorName,
      userId: selectedUserId
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/${id}`, editedPost);
      setPost(editedPost);
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      navigate("/posts");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-xl p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
        <p className="text-gray-600 mb-4">{post.description}</p>
        <p className="text-sm text-gray-500">Author: {post.author}</p>
        <div className="flex space-x-3 mt-4">
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Edit Post
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
          >
            Delete Post
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit Post</h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={editedPost.title || ''}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    name="description"
                    value={editedPost.description || ''}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    required
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Author</label>
                  <select
                    name="author"
                    value={editedPost.userId || ''}
                    onChange={handleAuthorChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    required
                  >
                    <option value="">Select an author</option>
                    {authors.map(author => (
                      <option key={author.id} value={author.id}>
                        {author.firstName} {author.lastName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}