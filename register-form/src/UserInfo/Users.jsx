// Users.js
import { useContext } from "react";
import { UserContext } from "./userContext";
import { ThemeContext } from "./themeProvider";
import { useNavigate } from "react-router-dom";

export default function Users() {
  const { theme } = useContext(ThemeContext);
  const { user, users, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className={`min-h-screen p-8 ${
      theme === "light" ? "bg-gray-50" : "bg-gray-800 text-white"
    }`}>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Welcome, {user.username}!</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        <h2 className="text-xl font-semibold mb-4">Registered Users</h2>
        <div className={`rounded-lg shadow-md overflow-hidden ${
          theme === "light" ? "bg-white" : "bg-gray-900"
        }`}>
          <table className="w-full">
            <thead className={`${
              theme === "light" ? "bg-gray-100" : "bg-gray-700"
            }`}>
              <tr>
                <th className="px-6 py-3 text-left">Username</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">Gender</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index} className={`${
                  index % 2 === 0 
                    ? theme === "light" 
                      ? "bg-white" 
                      : "bg-gray-900"
                    : theme === "light" 
                      ? "bg-gray-50" 
                      : "bg-gray-800"
                }`}>
                  <td className="px-6 py-4">{user.username}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.gender || "Not specified"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}