// userContext.js
import { createContext } from 'react';

export const UserContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  users: [],
  addUser: () => {}
});