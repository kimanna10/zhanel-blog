
import { useNavigate } from "react-router-dom";

export default function TopBar() {
  const navigate = useNavigate(); 

  const handleLogIn = () => {
    navigate("/login");
  };

  const handleHome = () => {
    navigate("/");
  };

  const handleUsers = () => {
    navigate("/userDisplay"); 
  };

  const handlePosts = () => {
    navigate("/PostList");
  };

  const handleProfile = () => {
    navigate("/myProfile"); 
  };

  return (
    <>
      <div className="flex flex-row p-3 h-1/6 w-screen bg-[#D9D9D9] justify-between items-center">
        <div className="flex gap-4">
          <button
            onClick={handleHome}
            className="bg-white text-gray-800 px-4 py-2 rounded font-light hover:bg-gray-200 transition-colors duration-200"
          >
            Home
          </button>
          <button
            onClick={handleUsers}
            className="bg-white text-gray-800 px-4 py-2 rounded font-light hover:bg-gray-200 transition-colors duration-200"
          >
            Users
          </button>
          <button
            onClick={handlePosts}
            className="bg-white text-gray-800 px-4 py-2 rounded font-light hover:bg-gray-200 transition-colors duration-200"
          >
            Posts
          </button>
          <button
            onClick={handleProfile}
            className="bg-white text-gray-800 px-4 py-2 rounded font-light hover:bg-gray-200 transition-colors duration-200"
          >
            My Profile
          </button>
        </div>
        <div>
          <button
            onClick={handleLogIn}
            className="bg-white text-gray-800 px-4 py-2 rounded font-light hover:bg-gray-200 transition-colors duration-200"
          >
            LogIn/LogOut
          </button>
        </div>
      </div>
    </>
  );
}