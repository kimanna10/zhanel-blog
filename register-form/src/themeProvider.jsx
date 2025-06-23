// themeProvider.js
import React, { useState, createContext } from "react";
import { UserContext } from "./GetInfo/userContext";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const addUser = (newUser) => {
    setUsers(prev => [...prev, newUser]);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <UserContext.Provider value={{ user, login, logout, users, addUser }}>
        <div className={theme === "dark" ? "dark" : ""}>{children}</div>
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
};