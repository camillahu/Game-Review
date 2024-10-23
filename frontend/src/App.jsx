import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom"; //npm i -D react-router-dom@latest
import Layout from "./pages/Layout";
import SignUp from "./pages/SignUp";
import MyGames from "./pages/MyGames";
import LogIn from "./pages/LogIn";
import Home from "./pages/Home";
import GamePage from "./pages/GamePage";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import NoPage from "./pages/NoPage";
import React, { useState, useRef, createContext, useEffect } from "react";
import Header from "./components/Header";
import updateView from "./utils/pageChanger";
import { gamesAndGenres } from "./api/gamesAndGenres";

function App() {
  const [page, setPage] = useState("home");
  const loginref = useRef(null);
  const gameref = useRef(1);
  const [allGames, setAllGames] = useState([]);

  useEffect(() => {
    async function fetchGames() {
      const response = await gamesAndGenres();
      setAllGames(response);
    }
    fetchGames();
  }, []);

  // function handlePageChange(page) {
  //   setPage(page);
  // }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="my-games" element={<MyGames />} />
            <Route path="login" element={<LogIn />} />
            <Route path="" element={<MyGames />} />
            <Route path="game-page" element={<GamePage />} />
            <Route path="profile" element={<Profile />} />
            <Route path="edit-profile" element={<EditProfile />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}



export default App;
export const Data = createContext();

// endre sql- en db for alle spillstatuser, en db som matcher de med username og gameID
// react router
// lagre all info i app- spillinfo og eventuelt userinfo sånn at man ikke trenger mange spørringer.
// legge til proxy i viteconfig
