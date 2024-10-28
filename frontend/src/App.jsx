import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
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
import { gamesAndGenres, genres } from "./api/gamesAndGenres";
import { userGamesByStatus } from "./api/userGames";
import { statusNames } from "./api/gameStatus";

function App() {
  const loginref = useRef("camillzy");
  const gameref = useRef(1);
  const [allGames, setAllGames] = useState([]);
  const [allGenres, setAllGenres] = useState([]);
  const [allStatusNames, setAllStatusNames] = useState([]);
  const [userGameStatus, setUserGameStatus] = useState([]);
  const [userGames, setUserGames] = useState([]);

  useEffect(() => {
    //fetching all games from the db with their respective genres as a string.
    async function fetchGames() {
      try {
        const response = await gamesAndGenres();
        setAllGames(response);
      } catch (error) {
        console.error("Error fetching all games", error);
      }
    }
    fetchGames();
  }, []);

  useEffect(() => {
    //fetching all genres from the db to view in the select in Home.
    async function fetchGenres() {
      try {
        const response = await genres();
        setAllGenres(response);
      } catch (error) {
        console.error("Error fetching genres", error);
      }
    }
    fetchGenres();
  }, []);

  useEffect(() => {
    //if a user is logged in, this fetches all rows with their username linked to any game+status combo.
    //this sends an array of objects with the gameId and status name e.g. "owned", "played", "wishlist" or "currently playing"
    if (loginref.current) {
      async function fetchGameStatus() {
        try {
          const response = await userGamesByStatus(loginref.current);
          setUserGameStatus(response);
        } catch (error) {
          console.error("Error fetching game statuses", error);
        }
      }
      fetchGameStatus();
    }
  }, [loginref]);

  useEffect(() => {
    //fetching all statuses from the db to view in the select in MyGames.
    async function fetchStatusNames() {
      try {
        const response = await statusNames();
        setAllStatusNames(response);
      } catch (error) {
        console.error("Error fetching genres", error);
      }
    }
    fetchStatusNames();
  }, []);

  useEffect(() => {
    //merging the allGames state and the userGameStatus state.
    //it filters all games based on the game Id's in status.
    //This ensures that only games the user has marked will be sent to MyGames.
    //Then it adds the status names in an array as the property "Statuses" in each game object.
    if (allGames.length && userGameStatus.length) {
      const userGameIds = new Set(
        userGameStatus.map((status) => status.GameId)
      );

      const filteredGames = allGames.filter((game) => userGameIds.has(game.Id));

      const gamesWithStatuses = filteredGames.map((game) => {
        const statusesForGame = userGameStatus
          .filter((status) => status.GameId === game.Id)
          .map((status) => status.Name);

        return { ...game, Statuses: statusesForGame };
      });

      setUserGames(gamesWithStatuses);
    }
  }, [allGames, userGameStatus]);
  console.log(userGames);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout loginref={loginref} />}>
            <Route
              index
              element={
                <Home
                  allGamesResult={allGames}
                  allGenresResult={allGenres}
                  gamesByStatus={userGameStatus}
                />
              }
            />
            <Route path="signup" element={<SignUp />} />
            <Route
              path="my-games"
              element={
                <MyGames
                  statusNames={allStatusNames}
                  userGames={userGames}
                />
              }
            />
            <Route path="login" element={<LogIn loginref={loginref} />} />
            <Route
              path="game-page"
              element={<GamePage loginref={loginref} gameref={gameref} />}
            />
            <Route path="profile" element={<Profile loginref={loginref} />} />
            <Route
              path="edit-profile"
              element={<EditProfile loginref={loginref} />}
            />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
// endre sql- en db for alle spillstatuser, en db som matcher de med username og gameID
// react router
// lagre all info i app- spillinfo og eventuelt userinfo sånn at man ikke trenger mange spørringer.
// legge til proxy i viteconfig
