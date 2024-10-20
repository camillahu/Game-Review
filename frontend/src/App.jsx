import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import React, { useState, useRef, createContext } from "react";

import SignUp from "./pages/SignUp";
import MyGames from "./pages/MyGames";
import LogIn from "./pages/LogIn";
import Home from "./pages/Home";
import GamePage from "./pages/GamePage";
import Profile from "./pages/Profile";
import Header from "./components/Header";

function App() {
  const [page, setPage] = useState("signup");
  const loginref = useRef(null);
  const gameref = useRef(1);

  function handlePageChange(page) {
    setPage(page);
  }

  function updateView() {
    switch (page) {
      case "login":
        return (
          <contextStuff.Provider
            value={{ loginref, gameref, handlePageChange }}
          >
            <LogIn />
          </contextStuff.Provider>
        );
        break;
      case "home":
        return (
          <contextStuff.Provider
            value={{ loginref, gameref, handlePageChange }}
          >
            <Home />
          </contextStuff.Provider>
        );

        break;
      case "signup":
        return (
          <contextStuff.Provider value={{ loginref, handlePageChange }}>
            <SignUp />
          </contextStuff.Provider>
        );

      case "myGames":
        return (
          <contextStuff.Provider value={{ loginref, gameref, handlePageChange }}>
            <MyGames loginref={loginref} handlePageChange={handlePageChange} />
          </contextStuff.Provider>
        );

      case "gamePage":
        return (
          <contextStuff.Provider
            value={{ loginref, gameref, handlePageChange }}
          >
            <GamePage />
          </contextStuff.Provider>
        );
        break;

      case "profile":
        return (
          <contextStuff.Provider
            value={{ loginref, gameref, handlePageChange }}
          >
            <Profile />
          </contextStuff.Provider>
        );
        break;

      default:
        return console.log("error changing page");
    }
  }

  return (
    <>
      <Header
        loginref={loginref}
        handlePageChange={handlePageChange}
        page={page}
      />
      {updateView()}
    </>
  );
}

export const contextStuff = createContext();
export default App;
