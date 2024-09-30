import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useRef, createContext } from "react";

import SignUp from "./pages/SignUp";
import MyGames from "./pages/MyGames";
import LogIn from "./pages/LogIn";
import Home from "./pages/Home";

import Header from "./components/Header";

function App() {
  const [page, setPage] = useState("home");
  const loginref = useRef("camillzy");

  function handlePageChange(page) {
    setPage(page);
    console.log(page);
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
        return <Home loginref={loginref} handlePageChange={handlePageChange}/>;
        break;
      case "signup":
        return (
          <contextStuff.Provider value={{ loginref, handlePageChange }}>
            <SignUp />
          </contextStuff.Provider>
        );

      case "myGames":
        return <MyGames loginref={loginref} handlePageChange={handlePageChange}/>;

      default:
        return console.log("error changing page");
    }
  }

  return <>
  <Header loginref={loginref} handlePageChange={handlePageChange}/>
  {updateView()}
  </>;
}

export const contextStuff = createContext();
export default App;
