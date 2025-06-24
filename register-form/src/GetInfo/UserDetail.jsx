// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function UserDetails() {
//   const { id } = useParams();
//   const [user, setUser] = useState(null);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [editedUser, setEditedUser] = useState({});
//   const navigate = useNavigate();
//   // const API_URL = "http://192.168.10.83:5167/users";
//   const API_URL = "http://localhost:5167/users";

//   useEffect(() => {
//     async function fetchUser() {
//       try {
//         const res = await axios.get(`${API_URL}/${id}`);
//         setUser(res.data);
//         setEditedUser(res.data); // Initialize editedUser with current data
//       } catch (error) {
//         console.log("Error fetching user:", error.message);
//         navigate("/users");
//       }
//     }
//     fetchUser();
//   }, [id, navigate]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;

//     // Handle nested objects (like address)
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

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put(`${API_URL}/${id}`, editedUser);
//       setUser(editedUser); // Update local state
//       setIsEditModalOpen(false); // Close modal
//     } catch (error) {
//       console.error("Error updating user:", error);
//     }
//   };

//   if (!user) return <div>Loading...</div>;

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
//       {/* User Card */}
//       <div className="bg-white shadow-lg rounded-xl p-6 max-w-md w-full">
//         <div className="flex flex-col items-center text-center">
//           <img
//             src={user.image}
//             alt={`${user.firstName} ${user.lastName}`}
//             className="w-24 h-24 rounded-full object-cover mb-4 border"
//           />
//           <h2 className="text-2xl font-bold mb-1">
//             {user.firstName} {user.lastName}
//           </h2>
//           <p className="text-gray-600 text-sm mb-3">@{user.username}</p>

//           <div className="text-left w-full mt-4">
//             <p className="text-sm text-gray-700 mb-2">
//               <span className="font-medium">Age:</span> {user.age}
//             </p>
//             <p className="text-sm text-gray-700 mb-2">
//               <span className="font-medium">Email:</span> {user.email}
//             </p>
//             <p className="text-sm text-gray-700 mb-2">
//               <span className="font-medium">Phone:</span> {user.phone}
//             </p>
//             <p className="text-sm text-gray-700">
//               <span className="font-medium">Location:</span> {user.address.city}
//               , {user.address.state}
//             </p>
//           </div>
//           <div className="flex justify-center mt-4 gap-24">
//             <button1
//               onClick={() => navigate(`/userDisplay`)}
//               className="mt-3 bg-neutral-100 text-sm text-gray-500 hover:bg-gray-200 py-2 px-4 rounded-full"
//             >
//               Back
//             </button1>
//             <button1
//               onClick={() => setIsEditModalOpen(true)}
//               className="mt-3 bg-neutral-100 text-sm text-gray-500 hover:bg-gray-200 py-2 px-4 rounded-full"
//             >
//               Edit
//             </button1>
//           </div>
//         </div>
//       </div>

//       {/* Edit Modal */}
//       {isEditModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg p-6 w-full max-w-md">
//             <h2 className="text-xl font-bold mb-4">Edit User</h2>
//             <form onSubmit={handleSubmit}>
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     First Name
//                   </label>
//                   <input
//                     type="text"
//                     name="firstName"
//                     value={editedUser.firstName || ""}
//                     onChange={handleInputChange}
//                     className="mt-1 block w-full border border-gray-300 rounded-md p-2"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Last Name
//                   </label>
//                   <input
//                     type="text"
//                     name="lastName"
//                     value={editedUser.lastName || ""}
//                     onChange={handleInputChange}
//                     className="mt-1 block w-full border border-gray-300 rounded-md p-2"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Age
//                   </label>
//                   <input
//                     type="number"
//                     name="age"
//                     value={editedUser.age || ""}
//                     onChange={handleInputChange}
//                     className="mt-1 block w-full border border-gray-300 rounded-md p-2"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={editedUser.email || ""}
//                     onChange={handleInputChange}
//                     className="mt-1 block w-full border border-gray-300 rounded-md p-2"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Phone
//                   </label>
//                   <input
//                     type="text"
//                     name="phone"
//                     value={editedUser.phone || ""}
//                     onChange={handleInputChange}
//                     className="mt-1 block w-full border border-gray-300 rounded-md p-2"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     City
//                   </label>
//                   <input
//                     type="text"
//                     name="address.city"
//                     value={editedUser.address?.city || ""}
//                     onChange={handleInputChange}
//                     className="mt-1 block w-full border border-gray-300 rounded-md p-2"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     State
//                   </label>
//                   <input
//                     type="text"
//                     name="address.state"
//                     value={editedUser.address?.state || ""}
//                     onChange={handleInputChange}
//                     className="mt-1 block w-full border border-gray-300 rounded-md p-2"
//                   />
//                 </div>
//               </div>
//               <div className="mt-6 flex justify-end space-x-3">
//                 <button
//                   type="button"
//                   onClick={() => setIsEditModalOpen(false)}
//                   className="bg-neutral-100 text-sm text-gray-500 hover:bg-gray-200 py-2 px-4 rounded-lg"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="bg-neutral-100 text-sm text-gray-500 hover:bg-gray-200 py-2 px-4 rounded-lg"
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

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedUser, setEditedUser] = useState({});
  const navigate = useNavigate();
  // Changed from localhost:5167 to localhost:3000 to match your JSON server
  const API_URL = "https://zhanel-blog.onrender.com/api/users";

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await axios.get(`${API_URL}/${id}`);
        setUser(res.data);
        setEditedUser(res.data);
      } catch (error) {
        console.log("Error fetching user:", error.message);
        navigate("/users");
      }
    }
    fetchUser();
  }, [id, navigate]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/${id}`, editedUser);
      setUser(editedUser);
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-100 p-6">
      {/* User Card */}
      <div className="bg-white shadow-lg rounded-xl p-6 max-w-md w-full">
        <div className="flex flex-col items-center text-center">
          <img
            src={user.image}
            alt={`${user.firstName} ${user.lastName}`}
            className="w-24 h-24 p-1 rounded-full object-cover mb-4 border bg-zinc-300"
          />
          <h2 className="text-2xl font-bold mb-1 text-zinc-800">
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-zinc-500 text-sm mb-3">@{user.username}</p>

          <div className="text-left w-full mt-4">
            <p className="text-sm text-zinc-700 mb-2">
              <span className="font-medium">Age:</span> {user.age}
            </p>
            <p className="text-sm text-zinc-700 mb-2">
              <span className="font-medium">Email:</span> {user.email}
            </p>
            <p className="text-sm text-zinc-700 mb-2">
              <span className="font-medium">Phone:</span> {user.phone}
            </p>
            <p className="text-sm text-zinc-700">
              <span className="font-medium">Location:</span> {user.address.city}
              , {user.address.state}
            </p>
          </div>

          <div className="flex justify-center mt-4 gap-24">
            <button
              onClick={() => navigate(`/userDisplay`)}
              className="mt-3 bg-white text-sm text-zinc-500 hover:bg-zinc-200 py-2 px-4 rounded-full border border-zinc-300"
            >
              Back
            </button>
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="mt-3 bg-white text-sm text-zinc-500 hover:bg-zinc-200 py-2 px-4 rounded-full border border-zinc-300"
            >
              Edit
            </button>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-zinc-800">Edit User</h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                {[
                  ["firstName", "First Name"],
                  ["lastName", "Last Name"],
                  ["age", "Age"],
                  ["email", "Email"],
                  ["phone", "Phone"],
                  ["address.city", "City"],
                  ["address.state", "State"],
                ].map(([name, label]) => (
                  <div key={name}>
                    <label className="block text-sm font-medium text-zinc-700">
                      {label}
                    </label>
                    <input
                      type={name === "age" ? "number" : "text"}
                      name={name}
                      value={
                        name.includes(".")
                          ? editedUser?.[name.split(".")[0]]?.[
                              name.split(".")[1]
                            ] || ""
                          : editedUser?.[name] || ""
                      }
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-zinc-300 rounded-md p-2 text-zinc-800"
                    />
                  </div>
                ))}
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="bg-white text-sm text-zinc-500 hover:bg-zinc-200 py-2 px-4 rounded border border-zinc-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-white text-sm text-zinc-500 hover:bg-zinc-200 py-2 px-4 rounded border border-zinc-300"
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
