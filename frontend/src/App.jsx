import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter, Routes, Route } from "react-router-dom"; //npm i -D react-router-dom@latest
import Layout from "./pages/Layout";

import MyGames from "./pages/MyGames";
import Home from "./pages/Home";
import GamePage from "./pages/GamePage";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import NoPage from "./pages/NoPage";
import LoginSignup from "./pages/LoginSignup.jsx";
import React, { useState, useRef, useEffect } from "react";
import { gamesAndGenres, genres } from "./api/gamesAndGenres";
import {
  userDetails,
  userGamesByStatus,
  ratingsForBarChart,
} from "./api/userDetails.js";

import { profileFunctions, pieChartFunction } from "./utils/userFunctions.js";

function App() {
  // const loginref = useRef(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [allGames, setAllGames] = useState([]);
  const [allGamesWithStatus, setAllGamesWithStatus] = useState([]);
  const [allGenres, setAllGenres] = useState([]);
  const [userGameStatus, setUserGameStatus] = useState([]);
  const [userGames, setUserGames] = useState([]);
  const [userInfo, setUserInfo] = useState({});


  useEffect(() => {
    //fetching all games from the db with their respective genres as a string.
    async function fetchGames() {
      try {
        const response = await gamesAndGenres();
        setAllGames(response);
      } catch (error) {
        console.error("Error fetching all games", error);
      }
      console.log("henter alle spill")
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
      console.log("henter alle sjangre")
    }
    fetchGenres();
  }, []);

  useEffect(() => {
    //if a user is logged in, this fetches all rows with their username linked to any game+status combo.
    //this sends an array of objects with the gameId and status name e.g. "owned", "played", "wishlist" or "currently playing"
    if (loggedInUser) {
      async function fetchGameStatus() {
        try {
          const response = await userGamesByStatus(loggedInUser);
          setUserGameStatus(response);
        } catch (error) {
          console.error("Error fetching game statuses", error);
        }
        console.log("henter alle sjanre hvis brukeren er logga inn")
      }
      fetchGameStatus();
    }
  }, [loggedInUser]);

  useEffect(() => {
    //populates the Statuses array with "owned", "wishlist", "played" or "currently playing"
    //if the user is logged in and userGameStatus is populated.
    //If not, Statuses is set to an empty array.
    if (loggedInUser && userGameStatus.length > 0) {
      const gamesWithStatuses = allGames.map((game) => {
        const statusesForGame = userGameStatus
              .filter((status) => status.GameId === game.Id)
              .map((status) => status.Name);
        return { ...game, Statuses: statusesForGame };
      });
      setAllGamesWithStatus(gamesWithStatuses);
      console.log("lager sjanger-array hvis brukeren er logga inn")
    } else {
      setAllGamesWithStatus(allGames);
      console.log("lager ikke sjanger-array hvis brukeren er logga inn") // Show all games if not logged in
    }
  }, [userGameStatus, loggedInUser, allGames]);

  useEffect(() => {
    //making a temporary Set of game-id's if the user has statuses on any games
    // filtering all games by which games has an Id that exists on the temporary Set
    if (loggedInUser && userGameStatus.length > 0) {
      const userGameIds = new Set(
        userGameStatus.map((status) => status.GameId)
      );
      const filteredGames = allGamesWithStatus.filter((game) =>
        userGameIds.has(game.Id)
      );
      setUserGames(filteredGames);
    }
  }, [allGamesWithStatus, userGameStatus, loggedInUser]);

  useEffect(() => {
    if (loggedInUser) {
      async function fetchUserInfo() {
        const [result, ratings] = await Promise.all([
          userDetails(loggedInUser),
          ratingsForBarChart(loggedInUser),
        ]);

        const allDataForProfile = {
          ...result,
          GamesOwned: profileFunctions(userGames, "Owned"),
          GamesPlayed: profileFunctions(userGames, "Played"),
          GenresForPie: pieChartFunction(userGames),
          RatingsForBar: ratings,
        };
        console.log(allDataForProfile);
        setUserInfo(allDataForProfile);
      }

      fetchUserInfo();
    }
  }, [loggedInUser, userGames]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout loggedInUser ={loggedInUser} />}>
            <Route
              index
              element={
                <Home
                  allGamesResult={allGamesWithStatus}
                  allGenresResult={allGenres}
                />
              }
            />
            <Route
              path="account/:choice"
              element={<LoginSignup setLoggedInUser={setLoggedInUser} />}
            />
            <Route
              path="my-games"
              element={<MyGames userGames={userGames} />}
            />
            <Route
              path="game-page/:gameId"
              element={
                <GamePage
                loggedInUser={loggedInUser}
                  allGamesWithStatus={allGamesWithStatus}
                />
              }
            />
            <Route
              path="profile"
              element={<Profile loggedInUser={loggedInUser} userInfo={userInfo} />}
            />
            <Route
              path="edit-profile"
              element={<EditProfile loggedInUser={loggedInUser} />}
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
// lagre all info i app- spillinfo og eventuelt userinfo sånn at man ikke trenger mange spørringer.
// legge til proxy i viteconfig
