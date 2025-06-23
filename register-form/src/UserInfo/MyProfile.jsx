// import { useState, useEffect } from "react";
// import { Edit, FileText, MessageSquare, Trash2 } from "lucide-react";

// export default function UserProfile() {

//   const [currentUser, setCurrentUser] = useState({
//     id: 1,
//     firstName: "John",
//     lastName: "Doe",
//     username: "johndoe",
//     email: "john.doe@example.com",
//     birthDate: "1995-06-15",
//     phone: "+1 (555) 123-4567",
//     age: 28,
//     image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
//     address: {
//       city: "New York",
//       state: "NY"
//     }
//   });

//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [editedUser, setEditedUser] = useState({});

//   useEffect(() => {
//     setEditedUser(currentUser);
//   }, [currentUser]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     if (name.includes(".")) {
//       const [parent, child] = name.split(".");
//       setEditedUser((prev) => ({
//         ...prev,
//         [parent]: {
//           ...prev[parent],
//           [child]: value,
//         },
//       }));
//     } else {
//       setEditedUser((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     }
//   };

//   const handleSubmit = async () => {
//     try {
//       setCurrentUser(editedUser);
//       setIsEditModalOpen(false);
//       console.log("Profile updated successfully");
//     } catch (error) {
//       console.error("Error updating profile:", error);
//     }
//   };

//   const handleAction = (action) => {
//     console.log(`${action} clicked`);
//   };

//   return (
//     <div className="min-h-screen bg-zinc-50 pt-16">

//       <div className="p-8">
//         <div className="bg-[#D9D9D9] rounded-lg p-8 max-w-6xl mx-auto">
//           <div className="flex gap-8">

//             <div className="flex-shrink-0">
//               <div className="w-48 h-48 bg-zinc-600 rounded-lg overflow-hidden">
//                 <img
//                   src={currentUser.image}
//                   alt={`${currentUser.firstName} ${currentUser.lastName}`}
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//             </div>

//             <div className="flex flex-col space-y-4 min-w-[200px]">
//               <button
//                 onClick={() => setIsEditModalOpen(true)}
//                 className="bg-[#717171] text-white py-3 px-6 rounded hover:bg-zinc-700 transition-colors flex items-center justify-center gap-2"
//               >
//                 <Edit className="w-4 h-4" />
//                 Edit profile
//               </button>
//               <button
//                 onClick={() => handleAction("My posts")}
//                 className="bg-[#717171] text-white py-3 px-6 rounded hover:bg-zinc-700 transition-colors flex items-center justify-center gap-2"
//               >
//                 <FileText className="w-4 h-4" />
//                 My posts
//               </button>
//               <button
//                 onClick={() => handleAction("My comments")}
//                 className="bg-[#717171] text-white py-3 px-6 rounded hover:bg-zinc-700 transition-colors flex items-center justify-center gap-2"
//               >
//                 <MessageSquare className="w-4 h-4" />
//                 My comments
//               </button>
//             </div>

//             <div className="flex flex-col space-y-4 min-w-[200px]">
//               <button
//                 onClick={() => handleAction("Add post")}
//                 className="bg-[#717171] text-white py-3 px-6 rounded hover:bg-zinc-700 transition-colors flex items-center justify-center gap-2"
//               >
//                 <FileText className="w-4 h-4" />
//                 Add post
//               </button>
//               <button
//                 onClick={() => handleAction("Delete account")}
//                 className="bg-[#717171] text-white py-3 px-6 rounded hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
//               >
//                 <Trash2 className="w-4 h-4" />
//                 Delete account
//               </button>
//             </div>

//             <div className="flex-1 bg-white rounded-lg p-6 ml-4">
//               <h1 className="text-3xl font-bold text-zinc-800 mb-2">
//                 {currentUser.firstName} {currentUser.lastName}
//               </h1>
//               <p className="text-zinc-600 text-lg mb-4">@{currentUser.username}</p>

//               <div className="space-y-3">
//                 <div className="flex">
//                   <span className="font-medium text-zinc-700 w-20">Age:</span>
//                   <span className="text-zinc-800">{currentUser.age}</span>
//                 </div>
//                 <div className="flex">
//                   <span className="font-medium text-zinc-700 w-20">Email:</span>
//                   <span className="text-zinc-800">{currentUser.email}</span>
//                 </div>
//                 <div className="flex">
//                   <span className="font-medium text-zinc-700 w-20">Phone:</span>
//                   <span className="text-zinc-800">{currentUser.phone}</span>
//                 </div>
//                 <div className="flex">
//                   <span className="font-medium text-zinc-700 w-20">Location:</span>
//                   <span className="text-zinc-800">{currentUser.address.city}, {currentUser.address.state}</span>
//                 </div>
//                 <div className="flex">
//                   <span className="font-medium text-zinc-700 w-20">Born:</span>
//                   <span className="text-zinc-800">{currentUser.birthDate}</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {isEditModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-zinc-200 rounded-lg p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto">

//             <button
//               onClick={() => setIsEditModalOpen(false)}
//               className="bg-[#717171] text-white px-4 py-2 rounded mb-6 hover:bg-zinc-500 transition-colors"
//             >
//               Back
//             </button>

//             <h2 className="text-4xl font-bold mb-8 text-zinc-800">Edit profile</h2>

//             <div>
//               <div className="grid grid-cols-2 gap-6 mb-8">
//                 {[
//                   ["firstName", "First Name"],
//                   ["lastName", "Last Name"],
//                   ["username", "Username"],
//                   ["email", "Email"],
//                   ["phone", "Phone"],
//                   ["age", "Age"],
//                   ["address.city", "City"],
//                   ["address.state", "State"],
//                 ].map(([name, label]) => (
//                   <div key={name}>
//                     <label className="block text-lg font-medium text-zinc-800 mb-2">
//                       {label}
//                     </label>
//                     <input
//                       type={name === "age" ? "number" : name === "email" ? "email" : "text"}
//                       name={name}
//                       value={
//                         name.includes(".")
//                           ? editedUser?.[name.split(".")[0]]?.[name.split(".")[1]] || ""
//                           : editedUser?.[name] || ""
//                       }
//                       onChange={handleInputChange}
//                       className="w-full border-2 border-zinc-300 rounded-lg p-3 text-zinc-800 bg-white focus:border-zinc-500 focus:outline-none"
//                     />
//                   </div>
//                 ))}
//               </div>

//               <div className="mb-6">
//                 <label className="block text-lg font-medium text-zinc-800 mb-2">
//                   Birth Date
//                 </label>
//                 <input
//                   type="date"
//                   name="birthDate"
//                   value={editedUser.birthDate || ""}
//                   onChange={handleInputChange}
//                   className="w-full border-2 border-zinc-300 rounded-lg p-3 text-zinc-800 bg-white focus:border-zinc-500 focus:outline-none"
//                 />
//               </div>

//               <div className="flex justify-start">
//                 <button
//                   onClick={handleSubmit}
//                   className="bg-[#717171] text-white px-8 py-3 rounded-lg hover:bg-zinc-700 transition-colors text-lg"
//                 >
//                   Save Changes
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { Edit, FileText, MessageSquare, Trash2, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function MyProfile() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedUser, setEditedUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch current user data from backend
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No authentication token found. Please log in.");
          setLoading(false);
          return;
        }

        const response = await fetch("https://zhanel-blog.onrender.com/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            setError("Session expired. Please log in again.");
            localStorage.removeItem("token");
          } else {
            setError("Failed to fetch user data");
          }
          setLoading(false);
          return;
        }

        const data = await response.json();
        setCurrentUser(data.user);
        setEditedUser(data.user);
        setLoading(false);
      } catch (err) {
        setError("Network error. Please check your connection.");
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setEditedUser((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setEditedUser((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No authentication token found");
        return;
      }

      const response = await fetch(
        `http://localhost:3000/users/${currentUser.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedUser),
        }
      );

      if (response.ok) {
        setCurrentUser(editedUser);
        setIsEditModalOpen(false);
        console.log("Profile updated successfully");
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Failed to update profile. Please try again.");
    }
  };

  const handleAddPost = () => {
    navigate("/create");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const handleMyPosts = () => {
    // Navigate to PostUser page with the current user's ID
    navigate(`/posts/user/${currentUser.id}`);
  };

  const handleAction = (action) => {
    console.log(`${action} clicked`);
    // Add your other action handlers here
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 pt-16 flex items-center justify-center">
        <div className="text-xl text-zinc-600">Loading your profile...</div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-zinc-50 pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl text-red-600 mb-4">{error}</div>
          <button
            onClick={handleLogout}
            className="bg-zinc-600 text-white px-6 py-2 rounded hover:bg-zinc-700"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // No user data
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-zinc-50 pt-16 flex items-center justify-center">
        <div className="text-xl text-zinc-600">No user data available</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 pt-16">
      <div className="p-8">
        <div className="bg-[#D9D9D9] rounded-lg p-8 max-w-6xl mx-auto">
          {/* Logout button */}
          <div className="flex justify-end mb-4">
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>

          <div className="flex gap-8">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <div className="w-48 h-48 bg-zinc-600 rounded-lg overflow-hidden">
                <img
                  src={currentUser.image}
                  alt={`${currentUser.firstName} ${currentUser.lastName}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${currentUser.firstName}+${currentUser.lastName}&size=192&background=6b7280&color=ffffff`;
                  }}
                />
              </div>
            </div>

            {/* Action Buttons Column 1 */}
            <div className="flex flex-col space-y-4 min-w-[200px]">
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="bg-[#717171] text-white py-3 px-6 rounded hover:bg-zinc-700 transition-colors flex items-center justify-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Edit profile
              </button>
              <button
                onClick={handleMyPosts}
                className="bg-[#717171] text-white py-3 px-6 rounded hover:bg-zinc-700 transition-colors flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4" />
                My posts
              </button>
              <button
                onClick={() => handleAction("My comments")}
                className="bg-[#717171] text-white py-3 px-6 rounded hover:bg-zinc-700 transition-colors flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                My comments
              </button>
            </div>

            {/* Action Buttons Column 2 */}
            <div className="flex flex-col space-y-4 min-w-[200px]">
              <button
                onClick={handleAddPost}
                className="bg-[#717171] text-white py-3 px-6 rounded hover:bg-zinc-700 transition-colors flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4" />
                Add post
              </button>
              <button
                onClick={() => handleAction("Delete account")}
                className="bg-red-600 text-white py-3 px-6 rounded hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete account
              </button>
            </div>

            {/* User Information */}
            <div className="flex-1 bg-white rounded-lg p-6 ml-4">
              <h1 className="text-3xl font-bold text-zinc-800 mb-2">
                {currentUser.firstName} {currentUser.lastName}
              </h1>
              <p className="text-zinc-600 text-lg mb-4">
                @{currentUser.username}
              </p>

              <div className="space-y-3">
                <div className="flex">
                  <span className="font-medium text-zinc-700 w-20">Age:</span>
                  <span className="text-zinc-800">{currentUser.age}</span>
                </div>
                <div className="flex">
                  <span className="font-medium text-zinc-700 w-20">Email:</span>
                  <span className="text-zinc-800">{currentUser.email}</span>
                </div>
                <div className="flex">
                  <span className="font-medium text-zinc-700 w-20">Phone:</span>
                  <span className="text-zinc-800">{currentUser.phone}</span>
                </div>
                <div className="flex">
                  <span className="font-medium text-zinc-700 w-20">
                    Location:
                  </span>
                  <span className="text-zinc-800">
                    {currentUser.address.city}, {currentUser.address.state}
                  </span>
                </div>
                {currentUser.birthDate && (
                  <div className="flex">
                    <span className="font-medium text-zinc-700 w-20">
                      Born:
                    </span>
                    <span className="text-zinc-800">
                      {currentUser.birthDate}
                    </span>
                  </div>
                )}
                <div className="flex">
                  <span className="font-medium text-zinc-700 w-20">ID:</span>
                  <span className="text-zinc-800">#{currentUser.id}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-zinc-200 rounded-lg p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="bg-[#717171] text-white px-4 py-2 rounded mb-6 hover:bg-zinc-500 transition-colors"
            >
              Back
            </button>

            <h2 className="text-4xl font-bold mb-8 text-zinc-800">
              Edit profile
            </h2>

            <div>
              <div className="grid grid-cols-2 gap-6 mb-8">
                {[
                  ["firstName", "First Name"],
                  ["lastName", "Last Name"],
                  ["username", "Username"],
                  ["email", "Email"],
                  ["phone", "Phone"],
                  ["age", "Age"],
                  ["address.city", "City"],
                  ["address.state", "State"],
                ].map(([name, label]) => (
                  <div key={name}>
                    <label className="block text-lg font-medium text-zinc-800 mb-2">
                      {label}
                    </label>
                    <input
                      type={
                        name === "age"
                          ? "number"
                          : name === "email"
                          ? "email"
                          : "text"
                      }
                      name={name}
                      value={
                        name.includes(".")
                          ? editedUser?.[name.split(".")[0]]?.[
                              name.split(".")[1]
                            ] || ""
                          : editedUser?.[name] || ""
                      }
                      onChange={handleInputChange}
                      className="w-full border-2 border-zinc-300 rounded-lg p-3 text-zinc-800 bg-white focus:border-zinc-500 focus:outline-none"
                    />
                  </div>
                ))}
              </div>

              {editedUser.birthDate && (
                <div className="mb-6">
                  <label className="block text-lg font-medium text-zinc-800 mb-2">
                    Birth Date
                  </label>
                  <input
                    type="date"
                    name="birthDate"
                    value={editedUser.birthDate || ""}
                    onChange={handleInputChange}
                    className="w-full border-2 border-zinc-300 rounded-lg p-3 text-zinc-800 bg-white focus:border-zinc-500 focus:outline-none"
                  />
                </div>
              )}

              <div className="flex justify-start">
                <button
                  onClick={handleSubmit}
                  className="bg-[#717171] text-white px-8 py-3 rounded-lg hover:bg-zinc-700 transition-colors text-lg"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
