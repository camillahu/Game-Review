import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useRef, createContext } from "react";

import SignUp from "./pages/SignUp";
import MyGames from "./pages/MyGames";
import LogIn from "./pages/LogIn";

import Header from "./components/Header";

function App() {
  const [page, setPage] = useState("myGames");
  const loginref = useRef("");

  function handlePageChange(page) {
    setPage(page);
  }

  function updateView() {
    switch (page) {
      case "login":
        return (
          <contextStuff.Provider value={{ loginref, handlePageChange }}>
            <LogIn />
          </contextStuff.Provider>
        );
        break;
      case "home":
        return <Home />;
        break;
      case "signup":
        return (
          <contextStuff.Provider value={handlePageChange}>
            <SignUp />
          </contextStuff.Provider>
        );

      case "myGames":
        return <MyGames />;

      default:
        return console.log("error changing page");
    }
  }

  return <>
  <Header/>
  {updateView()}
  </>;
}

export const contextStuff = createContext();
export default App;
