import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../themeProvider";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const [input, setInput] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const newErrors = [];

    if (input.length < 5) {
      newErrors.push("Username must be at least 5 characters!");
    } else {
      if (input === "") {
        newErrors.push("Username cannot be empty!");
      }
      if (/\d/.test(input)) {
        newErrors.push("Username cannot contain numbers!");
      }
    }

    setErrors((prev) => {
      const filtered = prev.filter(
        (err) =>
          !err.toLowerCase().includes("username") &&
          !err.toLowerCase().includes("empty!") &&
          !err.toLowerCase().includes("characters!") &&
          !err.toLowerCase().includes("numbers!")
      );
      return [...filtered, ...newErrors];
    });
  }, [input]);

  useEffect(() => {
    setErrors((prev) => {
      const filtered = prev.filter(
        (error) => !error.toLowerCase().includes("email")
      );
      const newErrors = [...filtered];

      function validateEmail(email) {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
      }

      if (email === "") {
        newErrors.push("Email cannot be empty!");
      } else if (!validateEmail(email)) {
        newErrors.push("Invalid email format!");
      }

      return newErrors;
    });
  }, [email]);

  useEffect(() => {
    setErrors((prev) => {
      const filtered = prev.filter(
        (error) => !error.toLowerCase().includes("password")
      );
      const newErrors = [...filtered];

      if (password === "") {
        newErrors.push("Password cannot be empty!");
      } else {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
        if (!regex.test(password)) {
          newErrors.push(
            "Password must be 8+ chars, include upper/lowercase, a number, and a special character."
          );
        }
      }

      return newErrors;
    });
  }, [password]);

  const validInput = async () => {
    if (errors.length === 0 && input && password && email) {
      setIsLoading(true);
      
      const gender = document.querySelector(
        'input[name="gender"]:checked'
      )?.value;
      
      const userData = {
        username: input,
        email,
        password,
        gender: gender || "Not specified",
      };

      try {
        // Fix: Use the correct endpoint /auth/signup
        const response = await fetch('https://zhanel-blog.onrender.com/api/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });

        const data = await response.json();

        if (response.ok) {
          // Store token in localStorage for future requests
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          
          alert("You've successfully Signed Up!");
          setInput("");
          setPassword("");
          setEmail("");
          setErrors([]);
          navigate("/login");
        } else {
          // Handle errors from server
          setErrors([data.message || 'An error occurred during signup']);
        }
      } catch (error) {
        console.error('Signup error:', error);
        setErrors(['Network error. Please try again.']);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const passwordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div
      className={`flex items-center justify-center h-screen p-8 rounded-2xl shadow-2xl flex flex-col justify-between${
        theme === "light" ? "bg-gray-100" : "bg-neutral-950 text-white"
      }`}
    >
      <div
        className={`w-[400px] p-8 rounded-2xl shadow-2xl flex flex-col justify-between ${
          theme === "light" ? "bg-white" : "bg-neutral-800"
        }`}
      >
        {/* Theme toggle */}
        {/* <button
          onClick={toggleTheme}
          className={`h-10 text-xs text-neutral-400 hover:text-neutral-100 p-0 text-center ${
            theme === "light" ? "bg-white" : "bg-neutral-800"
          }`}
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button> */}

        <h1
          className={`text-2xl font-bold text-center text-gray-900 mt-3 ${
            theme === "light" ? "text-gray-800" : "text-white"
          }`}
        >
          Sign Up
        </h1>

        <form
          className={`flex flex-col gap-4 flex-grow justify-center mt-3 ${
            theme === "light" ? "text-gray-800" : "text-white"
          }`}
        >
          {/* Username */}
          <input
            id="username"
            required
            type="text"
            placeholder="Username"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full border p-2 rounded text-black"
            disabled={isLoading}
          />

          {/* Email */}
          <input
            required
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded text-black"
            disabled={isLoading}
          />

          {/* Password */}
          <div className="relative">
            <input
              required
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border p-2 rounded text-black"
              disabled={isLoading}
            />
          </div>

          <div className="flex items-center">
            <input
              id="passwordVisible"
              type="checkbox"
              onClick={passwordVisibility}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500"
              disabled={isLoading}
            />
            <label htmlFor="passwordVisible" className="ms-2 text-sm font-medium">
              Show password
            </label>
          </div>

          {/* Gender radio */}
          <div className="flex flex-col justify-between items-center text-sm">
            <div className="flex items-center space-x-4">
              <span className={theme === "light" ? "text-gray-800" : "text-white"}>
                Gender:
              </span>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  className="mr-1"
                  disabled={isLoading}
                />
                Male
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  className="mr-1"
                  disabled={isLoading}
                />
                Female
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="other"
                  className="mr-1"
                  disabled={isLoading}
                />
                Other
              </label>
            </div>
          </div>

          <button
            type="button"
            onClick={validInput}
            disabled={errors.length > 0 || !input || !password || !email || isLoading}
            className={`w-full py-2 text-white font-medium rounded ${
              errors.length > 0 || !input || !password || !email || isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isLoading ? "Creating Account..." : "Sign Up"}
          </button>

          {/* Errors */}
          {errors.length > 0 && (
            <div className="text-red-500 text-sm space-y-1">
              {errors.map((error, i) => (
                <div key={i} className="truncate">
                  {error}
                </div>
              ))}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}