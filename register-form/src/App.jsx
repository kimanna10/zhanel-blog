import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./themeProvider.jsx";
import StartingPage from "./StartingPage.jsx";
import SignUp from "./UserInfo/SignUp.jsx";
import Login from "./UserInfo/LogIn.jsx";
import UserDisplay from "./GetInfo/usersDisplay.jsx";
import UserDetails from "./GetInfo/UserDetail.jsx";
import PostDetails from "./Posts/PostDetails.jsx"
import PostsList from "./Posts/PostList.jsx";
import PostSing from "./Posts/PostSing.jsx";
import Posts from "./Posts/Posts.jsx";
import PostUser from "./Posts/PostUser.jsx";
import PostCreate from "./Posts/PostCreate.jsx";
import "./App.css";
import TopBar from "./TopBar.jsx";
import MyProfile from "./UserInfo/MyProfile.jsx";

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <TopBar />
        <Routes>
          <Route path="/" element={<StartingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/userDisplay" element={<UserDisplay />} />
          <Route path="/user/:id" element={<UserDetails />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/post/:id" element={<PostSing />}/>
          <Route path="/posts/user/:userId" element={<PostUser />} />
          <Route path="/create" element={<PostCreate/>} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path ='/myProfile' element={<MyProfile/>}/>
          <Route path="/PostList" element={<PostsList />}/>

        </Routes>
      </Router>
    </ThemeProvider>

  );
}
