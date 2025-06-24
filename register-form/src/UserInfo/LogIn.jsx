import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../themeProvider";

export default function Login() {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in both fields");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://zhanel-blog.onrender.com/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        navigate("/MyProfile");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`flex items-center justify-center h-screen ${
        theme === "light" ? "bg-gray-100" : "bg-gray-800 text-white"
      }`}
    >
      <div
        className={`w-[400px] h-[550px] p-8 rounded-2xl shadow-2xl flex flex-col justify-between ${
          theme === "light" ? "bg-white" : "bg-gray-900"
        }`}
      >
        <h1
          className={`text-2xl font-bold text-center mt-12 ${
            theme === "light" ? "text-gray-900" : "text-white"
          }`}
        >
          Login
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 flex-grow justify-center"
        >
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border p-2 rounded text-black"
            disabled={isLoading}
          />
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border p-2 rounded text-black"
            disabled={isLoading}
          />

          <div className="flex flex-row text-sm gap-20">
            <p
              className={theme === "light" ? "text-gray-700" : "text-gray-300"}
            >
              Don't have an account?
            </p>
            <Link to="/SignUp" className="text-sky-500">
              Create account
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full font-medium py-3 px-4 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed text-white"
                : "bg-zinc-700 hover:bg-gray-700 text-white"
            }`}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>

          {error && (
            <div className="text-red-500 text-sm text-center truncate">
              {error}
            </div>
          )}
        </form>
        <p className="text-xs text-gray-500 text-center">© 2025</p>
      </div>
    </div>
  );
}
