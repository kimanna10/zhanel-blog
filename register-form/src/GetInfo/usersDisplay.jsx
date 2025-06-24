// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function UserDisplay() {
//   const [users, setUsers] = useState([]);
//   const navigate = useNavigate();
//   const API_URL = 'http://localhost:5167/users';

//   useEffect(() => {
//     async function fetchUsers() {
//       try {
//         const res = await axios.get(API_URL);
//         setUsers(res.data);
//       } catch (error) {
//         console.log("Trouble Downloading:", error.message);
//       }
//     }
//     fetchUsers();
//   }, []);

//   return (
//     <div className="min-h-screen bg-zinc-100">
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 p-8">
//         {users.map((user) => (
//           <div
//             key={user.id}
//             className="bg-[#D9D9D9] p-4 flex rounded-lg shadow gap-4"
//           >
//             <img
//               src={user.image}
//               alt={user.username}
//               className="p-2 w-26 h-26 object-cover rounded-full bg-zinc-100 shadow"
//             />

//             <div className="flex flex-col justify-between w-full">
//               {/* User Info */}
//               <div className="mb-4">
//                 <h2 className="text-lg font-semibold text-zinc-800">
//                   {user.firstName} {user.lastName}
//                 </h2>
//                 <p className="text-sm text-zinc-600">@{user.username}</p>
//                 <p className="text-sm text-zinc-700">
//                   <span className="font-medium">Age:</span> {user.age} ({user.birthDate})
//                 </p>
//                 <p className="text-sm text-zinc-700">
//                   <span className="font-medium">City:</span> {user.address.city}
//                 </p>
//               </div>

//               {/* Action Buttons */}
//               <div className="flex flex-col gap-2">
//                 <button
//                   onClick={() => navigate(`/user/${user.id}`)}
//                   className="bg-[#717171] text-white py-2 text-sm rounded hover:bg-zinc-600"
//                 >
//                   View profile
//                 </button>
//                 <button
//                   onClick={() => navigate(`/user/${user.id}/posts`)}
//                   className="bg-[#717171] text-white py-2 text-sm rounded hover:bg-zinc-600"
//                 >
//                   User's posts
//                 </button>
//                 <button
//                   onClick={() => navigate(`/user/${user.id}/comments`)}
//                   className="bg-[#717171] text-white py-2 text-sm rounded hover:bg-zinc-600"
//                 >
//                   User's comments
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserDisplay() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  // Changed from localhost:5167 to localhost:3000 to match your JSON server
  const API_URL = "https://zhanel-blog.onrender.com/api/users";

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await axios.get(API_URL);
        setUsers(res.data);
      } catch (error) {
        console.log("Trouble Downloading:", error.message);
      }
    }
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-100">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 p-8">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-[#D9D9D9] p-4 flex rounded-lg shadow gap-4"
          >
            <img
              src={user.image}
              alt={user.username}
              className="p-2 w-26 h-26 object-cover rounded-full bg-zinc-100 shadow"
            />

            <div className="flex flex-col justify-between w-full">
              {/* User Info */}
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-zinc-800">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-sm text-zinc-600">@{user.username}</p>
                <p className="text-sm text-zinc-700">
                  <span className="font-medium">Age:</span> {user.age}
                </p>
                <p className="text-sm text-zinc-700">
                  <span className="font-medium">City:</span> {user.address.city}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => navigate(`/user/${user.id}`)}
                  className="bg-[#717171] text-white py-2 text-sm rounded hover:bg-zinc-600"
                >
                  View profile
                </button>
                <button
                  onClick={() => navigate(`/user/${user.id}/posts`)}
                  className="bg-[#717171] text-white py-2 text-sm rounded hover:bg-zinc-600"
                >
                  User's posts
                </button>
                <button
                  onClick={() => navigate(`/user/${user.id}/comments`)}
                  className="bg-[#717171] text-white py-2 text-sm rounded hover:bg-zinc-600"
                >
                  User's comments
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
